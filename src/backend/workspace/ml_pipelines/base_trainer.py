class BaseTrainer:
    """
    공통 데이터(model, session)를 초기화하는 역할만 수행
    모든 학습 및 저장 로직은 각 자식 클래스(Trainer)에서 독립적으로 구현
    """
    def __init__(self, model_instance, session_instance):
        self.model = model_instance
        self.session = session_instance