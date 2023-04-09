import pydantic as _pydantic
import datetime as _dt

class _AccountBase(_pydantic.BaseModel):
    email: str

class AccountCreate(_AccountBase):
    password: str

    class Config:
        orm_mode = True

class Account(_AccountBase):
    ph_Num: str = None
    city: str = None
    postal_Code: str = None
    street: str = None
    province: str = None
    acc_type: str = None

    class Config:
        orm_mode = True

class _UserBase(_pydantic.BaseModel):
    email: str
    first_name: str
    last_name: str
    dob: str

class UserCreate(_UserBase):
    pass

class User(_UserBase):
    class Config:
        orm_mode = True
