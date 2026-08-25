from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    secret_key: str
    github_client_id: str
    github_client_secret: str

    class Config:
        env_file = ".env"


settings = Settings()
