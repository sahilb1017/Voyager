import database as _db
import sqlalchemy.orm as _orm
import sqlalchemy as _sql
import models as _models
import schemas as _schemas
import passlib.hash as _hash
import jwt as _jwt
import fastapi as _fastapi
import fastapi.security as _security

oauth2schema = _security.OAuth2PasswordBearer(tokenUrl="/token")
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


async def authenticate_account(email: str, password: str, db: _orm.Session):
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


async def get_current_account(db: _orm.Session = _fastapi.Depends(get_db), token: str = _fastapi.Depends(oauth2schema)):
    try:
        payload = _jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print(type(payload))

    except:
        raise _fastapi.HTTPException(status_code=401, detail="Invalid Email or Password")
    
    return _schemas.Account(
        email=payload["email"], ph_Num=payload["ph_Num"], city=payload["city"], 
        postal_Code=payload["postal_Code"], street=payload["street"], province=payload["province"], acc_type=payload["acc_type"]
    )


async def update_account(account: _schemas.Account, db: _orm.Session):
    db.execute(_sql.sql.text(f'''UPDATE ACCOUNT 
                                SET Ph_Num = "{account.ph_Num}",
                                    City = "{account.city}",
                                    Postal_Code = "{account.postal_Code}",
                                    Street = "{account.street}",
                                    Province = "{account.province}", 
                                    User_Type = "{account.acc_type}"
                                WHERE Email = "{account.email}"'''))
    db.commit()
    user =  db.execute(_sql.sql.text(f'SELECT * FROM ACCOUNT WHERE Email = "{account.email}"'))
    found_user = user.first()   

    return _schemas.Account(
        email=found_user.Email, ph_Num=found_user.Ph_Num, city=found_user.City, 
        postal_Code=found_user.Postal_Code, street=found_user.Street, province=found_user.Province, acc_type=found_user.User_Type
    )


async def update_user(user: _schemas.User, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO USER VALUES ("{user.email}", "{user.first_name}", "{user.last_name}", "{user.dob}")'))
    db.commit()
    found_user =  db.execute(_sql.sql.text(f'SELECT * FROM USER WHERE Email = "{user.email}"'))
    found_user = found_user.first()   

    return _schemas.User(
        email=found_user.Email, first_name=found_user.First_Name, last_name=found_user.Last_Name, dob=found_user.DOB
    )
                                                


