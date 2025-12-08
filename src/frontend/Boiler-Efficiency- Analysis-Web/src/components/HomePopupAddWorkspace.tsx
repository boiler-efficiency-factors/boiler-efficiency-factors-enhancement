import { useEffect, useMemo, useState } from 'react';
import FormField from './FormField';
import TextInput from './TextInput';
import DatePicker from './DatePicker';
import Dropdown from './Dropdown';
import MultiSelectDropdown from './MultiSelectDropdown';

type ModelValue = "random_forest" | "xgboost" | "lightgbm" | "gradient_boosting";

type ParamDef =
  | { key: string; label: string; kind: "int" | "float"; default: number }
  | { key: string; label: string; kind: "nullable_int"; default: number | null }
  | { key: string; label: string; kind: "bool"; default: boolean }
  | { key: string; label: string; kind: "choice"; default: string | number; options: { label: string; value: string }[] };

interface HomePopupAddWorkspaceProps {
  onClose: () => void;
  onCreateWorkspace: (data: {
    name: string;
    model: ModelValue;
    startDate: string;
    endDate: string;
    parameter: Record<string, unknown>;
    tuning: string;
    dependentVar: string;
    excludedVar: string[];
  }) => Promise<any>;
}

const CONFIG = {
  models: [
    { label: "Random Forest", value: "random_forest" },
    { label: "XGBoost", value: "xgboost" },
    { label: "LightGBM", value: "lightgbm" },
    { label: "Gradient Boosting Machine", value: "gradient_boosting" },
  ],
  dependentVariables: [
    '효율(순간)',
    '효율(평균)',
    '출력(kW)',
    '온도(°C)',
    '압력(bar)',
  ],
  independentVariables: [
    '효율(순간)',
    '효율(평균)',
    '출력(kW)',
    '온도(°C)',
    '압력(bar)',
    '유량(L/min)',
    '회전수(RPM)',
  ],
};

const TUNING_BY_MODEL: Record<
  ModelValue,
  { label: string; value: string }[]
> = {
  random_forest: [
    { label: "사용 안함", value: "" },
    { label: "Grid Search", value: "grid" },
    { label: "Random Search", value: "random" },
    { label: "Bayesian (Optuna)", value: "optuna" },
  ],
  xgboost: [
    { label: "사용 안함", value: "" },
    { label: "Grid Search", value: "grid" },
    { label: "Random Search", value: "random" },
    { label: "Bayesian (Optuna)", value: "optuna" },
  ],
  lightgbm: [
    { label: "사용 안함", value: "" },
    { label: "Grid Search", value: "grid" },
    { label: "Random Search", value: "random" },
    { label: "Bayesian (Optuna)", value: "optuna" },
  ],
  gradient_boosting: [
    { label: "사용 안함", value: "" },
    { label: "Grid Search", value: "grid" },
    { label: "Random Search", value: "random" },
    { label: "Bayesian (Optuna)", value: "optuna" },
  ],
};

const PARAM_DEFS: Record<ModelValue, ParamDef[]> = {
  xgboost: [
    { key: "max_depth", label: "max_depth", kind: "int", default: 6 },
    { key: "n_estimators", label: "n_estimators", kind: "int", default: 100 },
    { key: "min_child_weight", label: "min_child_weight", kind: "float", default: 1 },
    { key: "gamma", label: "gamma", kind: "float", default: 0 },
    { key: "learning_rate", label: "learning_rate", kind: "float", default: 0.3 },
    { key: "max_delta_step", label: "max_delta_step", kind: "float", default: 0 },
    { key: "reg_lambda", label: "reg_lambda", kind: "float", default: 1 },
    { key: "reg_alpha", label: "reg_alpha", kind: "float", default: 0 },
    { key: "subsample", label: "subsample", kind: "float", default: 1 },
    { key: "colsample_bytree", label: "colsample_bytree", kind: "float", default: 1 },
  ],
  lightgbm: [
    { key: "num_leaves", label: "num_leaves", kind: "int", default: 31 },
    { key: "max_depth", label: "max_depth", kind: "int", default: -1 },
    { key: "n_estimators", label: "n_estimators", kind: "int", default: 100 },
    { key: "min_child_samples", label: "min_child_samples", kind: "int", default: 20 },
    { key: "learning_rate", label: "learning_rate", kind: "float", default: 0.1 },
    { key: "min_split_gain", label: "min_split_gain", kind: "float", default: 0 },
    { key: "reg_lambda", label: "reg_lambda", kind: "float", default: 0 },
    { key: "reg_alpha", label: "reg_alpha", kind: "float", default: 0 },
    { key: "subsample", label: "subsample", kind: "float", default: 1.0 },
    { key: "colsample_bytree", label: "colsample_bytree", kind: "float", default: 1.0 },
  ],
  random_forest: [
    { key: "n_estimators", label: "n_estimators", kind: "int", default: 100 },
    { key: "max_depth", label: "max_depth (빈칸 = null)", kind: "nullable_int", default: null },
    { key: "min_samples_split", label: "min_samples_split", kind: "int", default: 2 },
    { key: "min_samples_leaf", label: "min_samples_leaf", kind: "int", default: 1 },
    {
      key: "criterion",
      label: "criterion",
      kind: "choice",
      default: "squared_error",
      options: [
        { label: "squared_error", value: "squared_error" },
        { label: "absolute_error", value: "absolute_error" },
        { label: "friedman_mse", value: "friedman_mse" },
        { label: "poisson", value: "poisson" },
      ],
    },
    {
      key: "max_features",
      label: "max_features",
      kind: "choice",
      default: "1.0",
      options: [
        { label: "sqrt", value: "sqrt" },
        { label: "log2", value: "log2" },
        { label: "1.0", value: "__ALL__" },
      ],
    },
    {
      key: "bootstrap",
      label: "bootstrap",
      kind: "bool",
      default: true,
    },
  ],
  gradient_boosting: [
    { key: "n_estimators", label: "n_estimators", kind: "int", default: 100 },
    { key: "max_depth", label: "max_depth", kind: "int", default: 3 },
    { key: "min_samples_split", label: "min_samples_split", kind: "int", default: 2 },
    { key: "min_samples_leaf", label: "min_samples_leaf", kind: "int", default: 1 },
    { key: "learning_rate", label: "learning_rate", kind: "float", default: 0.1 },
    { key: "subsample", label: "subsample", kind: "float", default: 1.0 },
    { key: "alpha", label: "alpha", kind: "float", default: 0.9 },
    {
      key: "loss",
      label: "loss",
      kind: "choice",
      default: "squared_error",
      options: [
        { label: "squared_error", value: "squared_error" },
        { label: "absolute_error", value: "absolute_error" },
        { label: "huber", value: "huber" },
        { label: "quantile", value: "quantile" },
      ],
    },
  ],
};

function Button1({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        학습 시작하기
      </p>
    </button>
  );
}
function Button2({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="bg-[var(--darkreader-background-243647,#2c4257)] content-stretch flex h-[40px] items-center justify-center px-[16px] py-[11px] relative rounded-[4px] shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
      <p className="font-['Inter:Semi_Bold','Noto_Sans_KR:Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[14px] text-[color:var(--darkreader-text-ffffff,#dcdad7)] text-nowrap whitespace-pre">
        취소하기
      </p>
    </button>
  );
}

export default function HomePopupAddWorkspace({ onClose, onCreateWorkspace }: HomePopupAddWorkspaceProps) {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [model, setModel] = useState<ModelValue | ''>('');
  const [tuning, setTuning] = useState('');
  const [dependentVar, setDependentVar] = useState('');
  const [excludedVar, setExcludedVar] = useState<string[]>([]);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});

  const paramDefs = useMemo(() => (model ? PARAM_DEFS[model] : []), [model]);

  useEffect(() => {
    if (!model) return;
    setTuning('');
  }, [model]);

  useEffect(() => {
    if (!model) return;
    const next: Record<string, string> = {};
    for (const def of PARAM_DEFS[model]) {
      if (def.kind === "bool") next[def.key] = def.default ? "true" : "false";
      else if (def.kind === "nullable_int") next[def.key] = def.default === null ? "" : String(def.default);
      else next[def.key] = String(def.default);
    }
    setParamValues(next);
  }, [model]);

  const handleAddExcludedVariable = (variable: string) => {
    if (excludedVar.includes(variable)) return;
    setExcludedVar([...excludedVar, variable]);
  };
  const handleRemoveExcludedVariable = (variable: string) => setExcludedVar(excludedVar.filter(v => v !== variable));

  const setParam = (key: string, value: string) => setParamValues(prev => ({ ...prev, [key]: value }));

  function buildParameterObject(): Record<string, unknown> {
    if (!model) return {};
    const out: Record<string, unknown> = {};

    for (const def of PARAM_DEFS[model]) {
      const raw = (paramValues[def.key] ?? "").trim();

      if (def.kind === "nullable_int") {
        if (raw === "") out[def.key] = null;
        else {
          const n = Number.parseInt(raw, 10);
          if (!Number.isFinite(n)) continue;
          out[def.key] = n;
        }
        continue;
      }

      if (raw === "") continue;

      if (def.kind === "int") {
        const n = Number.parseInt(raw, 10);
        if (!Number.isFinite(n)) continue;
        out[def.key] = n;
      } else if (def.kind === "float") {
        const n = Number.parseFloat(raw);
        if (!Number.isFinite(n)) continue;
        out[def.key] = n;
      } else if (def.kind === "bool") {
        out[def.key] = raw === "true";
      } else if (def.kind === "choice") {
        const cleaned = raw.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");
        if (def.key === "max_features") {
          if (cleaned === "1.0" || cleaned === "1" || cleaned === "__ALL__") {
            continue;
          }
          out[def.key] = cleaned;
          continue;
        } else {
          out[def.key] = cleaned;
        }
      }
    }
    return out;
  }

  const handleSubmit = async () => {
    if (!name || !startDate || !endDate || !model || !dependentVar) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      alert('날짜를 잘못 선택했습니다. 끝 날짜는 시작 날짜보다 늦어야 합니다.');
      return;
    }

    const payload = {
      name,
      model: model as ModelValue,
      startDate,
      endDate,
      tuning,
      dependentVar,
      excludedVar,
      parameter: buildParameterObject(),
    };
    console.log("created workspace:", payload);
    console.log("max_features typeof", typeof (payload.parameter as any).max_features, (payload.parameter as any).max_features);

    try {
      const created = await onCreateWorkspace(payload);
      onClose();
    } catch (e) {
      console.error(e);
      alert("워크스페이스 생성 실패");
    }

    console.log("workspace payload", payload);
    console.log("max_features typeof", typeof (payload.parameter as any).max_features, (payload.parameter as any).max_features);
  };

  return (
    <>
      <div className="absolute bg-[var(--darkreader-background-75757580,rgba(107,116,120,0.5))] inset-0 z-40" onClick={onClose} />
      <div className="absolute bg-[var(--darkreader-background-ffffff,#dcdad7)] content-stretch flex flex-col gap-[30px] items-center left-1/2 p-[50px] rounded-[24px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[800px] max-h-[90vh] overflow-y-auto z-50">

        <FormField label="워크스페이스 이름" required>
          <TextInput value={name} onChange={setName} placeholder="워크스페이스 이름" />
        </FormField>

        <FormField label="데이터 기간 선택" required>
          <div className="content-stretch flex gap-[16px] items-center justify-center max-w-[480px] relative shrink-0">
            <DatePicker value={startDate} onChange={setStartDate} placeholder="시작 날짜" />
            <DatePicker value={endDate} onChange={setEndDate} placeholder="끝 날짜" />
          </div>
        </FormField>

        <FormField label="모델 선택" required>
          <Dropdown value={model} onChange={setModel} placeholder="모델 선택" options={CONFIG.models} />
        </FormField>

        <FormField label="튜닝 방식 선택">
          <Dropdown
            value={tuning}
            onChange={setTuning}
            placeholder="튜닝 방식"
            options={
              model
                ? TUNING_BY_MODEL[model as ModelValue]
                : [{ label: "먼저 모델을 선택하세요", value: "" }]
            }
          />
        </FormField>

        <FormField label="모델 파라미터(parameter)">
          {!model ? (
            <p className="text-[14px] opacity-70">모델을 선택하면 파라미터 입력칸이 나타납니다.</p>
          ) : (
            <div className="w-full flex flex-col gap-[12px]">
              {paramDefs.map((def) => {
                if (def.kind === "choice") {
                  return (
                    <div key={def.key} className="w-full">
                      <Dropdown
                        value={paramValues[def.key] ?? ""}
                        onChange={(v) => setParam(def.key, v)}
                        placeholder={def.label}
                        options={def.options}
                      />
                    </div>
                  );
                }
                if (def.kind === "bool") {
                  return (
                    <div key={def.key} className="w-full">
                      <Dropdown
                        value={paramValues[def.key] ?? "true"}
                        onChange={(v) => setParam(def.key, v)}
                        placeholder={def.label}
                        options={[
                          { label: "true", value: "true" },
                          { label: "false", value: "false" },
                        ]}
                      />
                    </div>
                  );
                }
                return (
                  <div key={def.key} className="w-full">
                    <TextInput
                      value={paramValues[def.key] ?? ""}
                      onChange={(v) => setParam(def.key, v)}
                      placeholder={def.label}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </FormField>

        <FormField label="종속 변수 선택" required>
          <Dropdown value={dependentVar} onChange={setDependentVar} placeholder="종속 변수" options={CONFIG.dependentVariables} />
        </FormField>

        <FormField label="제외할 독립 변수 선택">
          <MultiSelectDropdown
            selectedItems={excludedVar}
            onAdd={handleAddExcludedVariable}
            onRemove={handleRemoveExcludedVariable}
            placeholder="제외할 독립 변수"
            options={CONFIG.independentVariables}
          />
        </FormField>

        <div className="content-stretch flex gap-[20px] items-start relative shrink-0">
          <Button1 onClick={handleSubmit} />
          <Button2 onClick={onClose} />
        </div>
      </div>
    </>
  );
}
