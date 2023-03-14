import { CreateUserDTO } from "./create-user.dto";
import { UserSettingDTO } from "./user-setting.dto";
declare const UpdateUserDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDTO>>;
export declare class UpdateUserDTO extends UpdateUserDTO_base {
    coverPicture: string;
    whatsappContact: string;
    skype: string;
    websiteLink: string;
    userSetting: UserSettingDTO;
}
export {};
