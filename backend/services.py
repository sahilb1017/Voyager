import database as _db
import sqlalchemy.orm as _orm
import sqlalchemy as _sql
import models as _models
import schemas as _schemas
import passlib.hash as _hash
import jwt as _jwt

JWT_SECRET = "secret"

def get_db():
    db = _db.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_account_by_email(email: str, db: _orm.Session):
    return db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{email}"'))

async def create_account(account: _schemas.AccountCreate, db: _orm.Session):
    hashed = _hash.bcrypt.hash(account.password)
    db.execute(_sql.sql.text(f'INSERT INTO ACCOUNT VALUES ("{account.email}", "{hashed}", NULL, NULL, NULL, NULL, NULL, NULL)'))
    db.commit()

    user = db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{account.email}"'))
    user = user.first()

    return _schemas.Account(
        email=user.Email, ph_Num=user.Ph_Num, city=user.City, 
        postal_Code=user.Postal_Code, street=user.Street, province=user.Province, acc_type=user.User_Type
    )


async def authenticate_user(email: str, password: str, db: _orm.Session):
    user =  db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{email}"'))
    found_user = user.first()

    if not found_user:
        return False
    
    if not _hash.bcrypt.verify(password, found_user.Password):
        return False
    
    user_obj = _schemas.Account(
        email=found_user.Email, ph_Num=found_user.Ph_Num, city=found_user.City, 
        postal_Code=found_user.Postal_Code, street=found_user.Street, province=found_user.Province, acc_type=found_user.User_Type
    )

    return user_obj


async def create_token(user: _schemas.Account):
    token = _jwt.encode(user.dict(), JWT_SECRET)
    return dict(access_token = token, token_type = "bearer")



    


