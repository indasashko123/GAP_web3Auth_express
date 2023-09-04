


export class ApiError extends Error {
    status : number;
    errors : any;
    constructor(status: number,message : string, errors: any = [])  {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static async UnautorizesError() : Promise<ApiError> {
        return new ApiError(401, "Пользователь не авторизован");
    }

    static async BadRequest(message : string, errors : any = []) : Promise<ApiError> {
        return new ApiError(400, message, errors);
    }

    static async NotFound(message : string) : Promise<ApiError>{
        return new ApiError(404, message);
    }
}