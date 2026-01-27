// src/components/dashboard/DashBoard30Days.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// import { fetchDashboardSummary30d, fetchDashboardTimeSeries30d, fetchDashboardHeatmap30d } from "../../api/dashboard";

type KpiItem = {
  title: string;
  value: string;
  sub?: string;
};

type TimeSeriesPoint = {
  t: string;
  efficiency: number;
  nox: number;
  o2: number;
  load: number;
};

type HeatCell = {
  day: string;
  hour: number; 
  value: number;
};

type ChartMetric = "efficiency" | "nox" | "o2" | "load";

export default function Dashboard30Days() {
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);

  const [metric, setMetric] = useState<ChartMetric>("efficiency");

  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [series, setSeries] = useState<TimeSeriesPoint[]>([]);
  const [heatmap, setHeatmap] = useState<HeatCell[]>([]);

  const metricLabel: Record<ChartMetric, string> = {
    efficiency: "효율(입출력법)",
    nox: "배기가스 NOx",
    o2: "배기가스 O2",
    load: "부하율",
  };

  const refresh = async () => {
    setLoading(true);
    try {
      // const [summaryRes, seriesRes, heatRes] = await Promise.all([
      //   fetchDashboardSummary30d(),
      //   fetchDashboardTimeSeries30d({ bucket: "1h" }),
      //   fetchDashboardHeatmap30d({ metric: "efficiency" }),
      // ]);

      // UI 확인용 더ㅣㅁ
      const summaryDummy: KpiItem[] = [
        { title: "효율(입출력법) 평균", value: "91.4%", sub: "최근 30일 평균" },
        { title: "효율(순간) 평균", value: "90.8%", sub: "최근 30일 평균" },
        { title: "NOx 평균", value: "38 ppm", sub: "최근 30일 평균" },
        { title: "O2 평균", value: "4.1%", sub: "최근 30일 평균" },
        { title: "부하율 평균", value: "72%", sub: "최근 30일 평균" },
        { title: "정상 운전 확률", value: "93%", sub: "최근 30일 평균" },
        { title: "스팀량 평균", value: "1,280 kg/h", sub: "최근 30일 평균" },
        { title: "연료 사용량", value: "2.1 t", sub: "최근 30일 누적" },
      ];

      const seriesDummy: TimeSeriesPoint[] = Array.from({ length: 30 }).map(
        (_, i) => {
          const day = i + 1;
          return {
            t: `01-${String(day).padStart(2, "0")}`,
            efficiency: 89 + Math.random() * 5,
            nox: 30 + Math.random() * 20,
            o2: 3 + Math.random() * 2,
            load: 55 + Math.random() * 30,
          };
        }
      );

      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const heatDummy: HeatCell[] = [];
      for (const d of days) {
        for (let h = 0; h < 24; h++) {
          heatDummy.push({
            day: d,
            hour: h,
            value: 88 + Math.random() * 6, 
          });
        }
      }

      setKpis(summaryDummy);
      setSeries(seriesDummy);
      setHeatmap(heatDummy);
      setLastUpdatedAt(new Date());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const metricKey = metric;
  const metricFormatter = (v: number) => {
    if (metricKey === "efficiency") return `${v.toFixed(1)}%`;
    if (metricKey === "o2") return `${v.toFixed(2)}%`;
    if (metricKey === "load") return `${v.toFixed(0)}%`;
    return `${v.toFixed(1)}`;
  };

  const heatStats = useMemo(() => {
    if (heatmap.length === 0) return { min: 0, max: 1 };
    const values = heatmap.map((c) => c.value);
    return { min: Math.min(...values), max: Math.max(...values) };
  }, [heatmap]);

  const heatColor = (value: number) => {
    const { min, max } = heatStats;
    const ratio = max === min ? 0.5 : (value - min) / (max - min);
    const level = Math.round(240 - ratio * 120);
    return `rgb(${level}, ${level}, ${level})`;
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            최근 30일 운영 대시보드
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            워크스페이스와 무관하게, 수집된 운영 데이터 기준으로 최근 30일 패턴을
            요약합니다.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs text-slate-500">
            {lastUpdatedAt ? (
              <>
                마지막 갱신:{" "}
                <span className="font-semibold text-slate-700">
                  {lastUpdatedAt.toLocaleString()}
                </span>
              </>
            ) : (
              "데이터 로딩 중"
            )}
          </div>
          <button
            className="px-4 py-2 text-sm font-semibold rounded-md bg-slate-800 text-white border border-slate-800 hover:opacity-90 disabled:opacity-60"
            onClick={refresh}
            disabled={loading}
          >
            {loading ? "갱신 중..." : "새로고침"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.title}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm"
          >
            <div className="text-xs font-semibold text-slate-500">
              {k.title}
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-800">
              {k.value}
            </div>
            {k.sub && <div className="mt-1 text-xs text-slate-500">{k.sub}</div>}
          </div>
        ))}
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              시계열 추세 (최근 30일)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              선택한 지표의 추세를 확인하고 급격한 변화 구간을 탐지합니다.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-600">지표</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as ChartMetric)}
              className="text-sm border border-slate-200 rounded-md px-3 py-2 bg-white text-slate-700"
            >
              <option value="efficiency">효율(입출력법)</option>
              <option value="nox">배기가스 NOx</option>
              <option value="o2">배기가스 O2</option>
              <option value="load">부하율</option>
            </select>
          </div>
        </div>

        <div className="mt-4 h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="t" />
              <YAxis tickFormatter={(v) => metricFormatter(Number(v))} />
              <Tooltip
                formatter={(v: any) => metricFormatter(Number(v))}
                labelFormatter={(label) => `일자: ${label}`}
              />
              <Line
                type="monotone"
                dataKey={metricKey}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          표시 지표: <span className="font-semibold">{metricLabel[metric]}</span>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">
              시간대 패턴 히트맵 (Hour × Day)
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              특정 시간대에 반복되는 성능 저하/배출 상승 패턴을 빠르게 확인합니다.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            범위: <span className="font-semibold">최근 30일</span>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <div className="min-w-[860px]">
            <div className="grid grid-cols-[80px_repeat(24,1fr)] gap-1 mb-2">
              <div className="text-xs font-semibold text-slate-600">Day/Hour</div>
              {Array.from({ length: 24 }).map((_, h) => (
                <div
                  key={h}
                  className="text-[10px] text-slate-500 text-center"
                >
                  {h}
                </div>
              ))}
            </div>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <div
                key={d}
                className="grid grid-cols-[80px_repeat(24,1fr)] gap-1 mb-1"
              >
                <div className="text-xs font-semibold text-slate-600 flex items-center">
                  {d}
                </div>
                {Array.from({ length: 24 }).map((_, h) => {
                  const cell = heatmap.find((c) => c.day === d && c.hour === h);
                  const v = cell?.value ?? 0;

                  return (
                    <div
                      key={`${d}-${h}`}
                      title={`${d} ${h}:00 = ${v.toFixed(2)}`}
                      className="h-5 rounded-sm border border-slate-200"
                      style={{ background: heatColor(v) }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-3 text-xs text-slate-500">
          현재 히트맵은 예시로 “효율”을 표시하도록 구성되어 있습니다. (실제 운영 시
          NOx/O2 등으로 전환 가능)
        </div>
      </div>
    </div>
  );
}
