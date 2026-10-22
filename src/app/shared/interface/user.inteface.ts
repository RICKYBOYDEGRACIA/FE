export interface UserFormModel {
    _id?: string,
    firstName: string,
    middleName: string,
    lastName: string,
    age: number,
    email: string,
    password?: string,
    location:{
        city: string,
        barangay: string,
    }
}