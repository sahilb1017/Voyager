import pydantic as _pydantic
import datetime as _dt
from typing import List

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

class User(_UserBase):
    class Config:
        orm_mode = True


class _CompanyBase(_pydantic.BaseModel):
    email: str 
    comp_name: str

class Company(_CompanyBase):
    class Config:
        orm_mode = True

class _InspectorBase(_pydantic.BaseModel):
    email: str
    first_name: str
    last_name: str
    dob: str

class Inspector(_InspectorBase):
    class Config:
        orm_mode = True    


class _VehicleBase(_pydantic.BaseModel):
    reg_num: str
    license: str
    num_passengers: int
    mileage: str
    model: str
    make: str
    color: str
    price: str
    owner_id: str
    vehicle_type: str


class VehicleCreate(_VehicleBase):
    vehicle_type: str
    extra: str
    class Config:
        orm_mode = True   

class Vehicle(_VehicleBase):
    date_posted: str    
    mechanic_id: int
    cleaner_id: int
    availability: int
    reviewed: int
    class Config:
        orm_mode = True   

class Car(Vehicle):
    type: str
    class Config:
        orm_mode = True   

class Truck(Vehicle):
    tonnage: str
    class Config:
        orm_mode = True   

class Boat(Vehicle):
    knots: str
    class Config:
        orm_mode = True  

class Motorcycle(Vehicle):
    cc: str
    class Config:
        orm_mode = True  

class Jet(Vehicle):
    tbo: str
    class Config:
        orm_mode = True  


class _IRBase(_pydantic.BaseModel):
    damages: str
    cleanliness: str
    overall: str
    inspector_email: str
    vehicle_reg: str
    decision: int

class IRCreate(_IRBase):
    type: str
    class Config:
        orm_mode = True  


class Location(_pydantic.BaseModel):
    city: str
    postal_code: str
    street: str
    province: str


class _BookingBase(_pydantic.BaseModel):
    vehicle_reg: str
    email: str
    num_days: int
    start_date: str
    end_date: str
    insurance_id: int
    coupon_id: int
    pickup: Location
    dropoff: Location
    cost: int
    discount: int
    

class BookingCreate(_BookingBase):
    class Config:
        orm_mode = True  


class _CouponBase(_pydantic.BaseModel):
    coupon: int

class Coupon(_CouponBase):
    class Config:
        orm_mode = True  

class CouponSend(_CouponBase):
    discount: int
    class Config:
        orm_mode = True  

class RetrieveInfo(_pydantic.BaseModel):
    email: str
    class Config:
        orm_mode = True  



class BookedVehicle(_pydantic.BaseModel):
    num_passengers: int
    mileage: str
    model: str
    make: str
    color: str
    price: str   
    date_posted: str   
    start_date: str
    end_date: str
    pickup: str
    dropoff: str
    vehicle_type: str
    class Config:
        orm_mode = True  

class BookedCar(BookedVehicle):
    type: str
    class Config:
        orm_mode = True  


class BookedTruck(BookedVehicle):
    tonnage: str
    class Config:
        orm_mode = True    

class BookedBoat(BookedVehicle):
    knots: str
    class Config:
        orm_mode = True  

class BookedMotorcycle(BookedVehicle):
    cc: str
    class Config:
        orm_mode = True  

class BookedJet(BookedVehicle):
    tbo: str
    class Config:
        orm_mode = True 


class Pending(_pydantic.BaseModel):
    num_passengers: int
    mileage: str
    model: str
    make: str
    color: str
    price: str   
    date_posted: str   
    type: str    


class InspectionDetails(_pydantic.BaseModel):
    num_passengers: int
    mileage: str
    model: str
    make: str
    color: str
    price: str   
    date_posted: str   
    vehicle_type: str 
    cleanliness: str
    damages: str
    overall: str

class InspectionCar(InspectionDetails):
    type: str
    class Config:
        orm_mode = True 

class InspectionTruck(InspectionDetails):
    tonnage: str
    class Config:
        orm_mode = True 

class InspectionBoat(InspectionDetails):
    knots: str
    class Config:
        orm_mode = True 

class InspectionMotorcycle(InspectionDetails):
    cc: str
    class Config:
        orm_mode = True 

class InspectionJet(InspectionDetails):
    tbo: str
    class Config:
        orm_mode = True 