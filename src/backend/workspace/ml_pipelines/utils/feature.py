import io
import base64
import platform
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import font_manager, rc
from pathlib import Path
from datetime import datetime
from uuid import uuid4
from matplotlib import font_manager as fm
import matplotlib.pyplot as plt

# matplotlib의 한글 폰트 인식이 불가능해서 강제로 삽입 후 인식
# 다른 환경의 경우 주석 처리?
#===============================================================================
FONT_PATH = "/usr/share/fonts/truetype/nanum/NanumGothicCoding.ttf"

fm.fontManager.addfont(FONT_PATH)
plt.rcParams["font.family"] = fm.FontProperties(fname=FONT_PATH).get_name()
plt.rcParams["axes.unicode_minus"] = False
#===============================================================================

def feature(model, X_train: pd.DataFrame, top_n: int = 10) -> str:
    """
    모델의 feature_importances_ 기반으로
    상위 top_n 피처 중요도 그래프를 만들고 base64 PNG 문자열로 반환
    """
    system_name = platform.system()
    if system_name == 'Windows':
        rc('font', family='Malgun Gothic')
    elif system_name == 'Darwin':
        rc('font', family='AppleGothic')
    else: # 리눅스의 겅우
        candidates = ["NanumGothic", "Noto Sans CJK KR", "Noto Sans KR", "UnDotum", "DejaVu Sans"]
        available = {f.name for f in font_manager.fontManager.ttflist}
        chosen = "Noto Sans CJK KR"
        for name in candidates:
            if name in available:
                chosen = name
                break
    
        if chosen:
            rc("font", family=chosen)
        else:
            # 한글 폰트 없음?
            print("No Korean font found for matplotlib. Install fonts-nanum or fonts-noto-cjk.")
            pass

    plt.rcParams['axes.unicode_minus'] = False

    importance = model.feature_importances_

    feature_names = (
        list(X_train.columns)
        if hasattr(X_train, "columns")
        else [f"f{i}" for i in range(len(importance))]
    )

    importance_df = (
        pd.DataFrame({"feature": feature_names, "importance": importance})
        .sort_values(by="importance", ascending=False)
    )

    top_features = importance_df.head(top_n).iloc[::-1]

    # 시각화 진행
    plt.figure(figsize=(12, 6))
    plt.barh(top_features["feature"], top_features["importance"])
    plt.xlabel("Importance", fontsize=12)
    plt.ylabel("Feature", fontsize=12)
    plt.title(f"Top {top_n} Important Features", fontsize=14)
    plt.tight_layout()

    # 저장 형식을 base64로(png는 서버에 저장, base64는 데이터베이스에 저장)
    buffer = io.BytesIO()
    plt.savefig(buffer, format="png")
    # 검증용 png 파일을 폴더에 따로 보관 필요
    images_dir = Path(__file__).resolve().parent / "images"
    images_dir.mkdir(parents=True, exist_ok=True)

    png_bytes = buffer.getvalue()
    filename = f"feature_importance_{datetime.now().strftime('%Y%m%d_%H%M%S')}_{uuid4().hex[:8]}.png"
    file_path = images_dir / filename
    file_path.write_bytes(png_bytes)

    plt.close()
    buffer.seek(0)

    img_base64: str = base64.b64encode(buffer.read()).decode("utf-8")
    return img_base64
