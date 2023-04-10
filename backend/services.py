import database as _db
import sqlalchemy.orm as _orm
import sqlalchemy as _sql
import schemas as _schemas
import passlib.hash as _hash
from datetime import date



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

    user_obj = _schemas.Account(
        email=found_user.Email, ph_Num=found_user.Ph_Num, city=found_user.City, 
        postal_Code=found_user.Postal_Code, street=found_user.Street, province=found_user.Province, acc_type=found_user.User_Type
    )

    return await user_obj


async def create_user(user: _schemas.User, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO USER VALUES ("{user.email}", "{user.first_name}", "{user.last_name}", "{user.dob}")'))
    db.commit()
    found_user =  db.execute(_sql.sql.text(f'SELECT * FROM USER WHERE Email = "{user.email}"'))
    found_user = found_user.first()   

    return _schemas.User(
        email=found_user.Email, first_name=found_user.First_Name, last_name=found_user.Last_Name, dob=found_user.DOB
    )


async def create_company(company: _schemas.Company, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO COMPANY VALUES ("{company.email}", "{company.comp_name}")'))  
    db.commit()

    found_company =  db.execute(_sql.sql.text(f'SELECT * FROM Company WHERE Email = "{company.email}"'))
    found_company = found_company.first()

    return _schemas.Company(
        email=found_company.Email, comp_name=found_company.Comp_Name
    )


async def create_inspector(inspector: _schemas.Inspector, db: _orm.Session):
    db.execute(_sql.sql.text(f'INSERT INTO INSPECTOR VALUES ("{inspector.email}", "{inspector.first_name}", "{inspector.last_name}", "{inspector.dob}")'))
    db.commit()
    found_inspector =  db.execute(_sql.sql.text(f'SELECT * FROM USER WHERE Email = "{inspector.email}"'))
    found_inspector = found_inspector.first()   

    return _schemas.Inspector(
        email=found_inspector.Email, first_name=found_inspector.First_Name, last_name=found_inspector.Last_Name, dob=found_inspector.DOB
    )


async def create_vehicle(vehicle: _schemas.VehicleCreate, db: _orm.Session):
    mechanic_id = 1
    cleaner_id = 1
    today = str(date.today())
    
    db.execute(_sql.sql.text(f'''INSERT INTO VEHICLE VALUES(
                                "{vehicle.reg_num}",
                                "{vehicle.license}",
                                {vehicle.num_passengers},
                                "{vehicle.mileage}",
                                "{vehicle.model}",
                                "{vehicle.make}",
                                "{vehicle.color}",
                                "{vehicle.price}",
                                1,
                                0,
                                {mechanic_id},
                                {cleaner_id},
                                "{vehicle.owner_id}",
                                "{today}"
                            )'''))
    db.commit()

    db.execute(_sql.sql.text(f'INSERT INTO {vehicle.vehicle_type} VALUES ("{vehicle.reg_num}", "{vehicle.extra}")'))
    db.commit()
                                                


