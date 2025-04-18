import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { API_METHODS } from '@/common/constants/apiMethods';
import { apiRequest } from '@/lib/apiClient';
import { UserRoles } from '@/types/enum';

interface UserData {
  userData: {
    id: string;
    name: string;
    email: string;
    roles: UserRoles[];
  };
}
// TODO Fix role to employee marketing
const ROLE_PRIORITY: UserRoles[] = [
  UserRoles.ADMIN,
  UserRoles.LEAD_MARKETING,
  UserRoles.EMPLOYEE_MARKETING,
  UserRoles.COUNSELOR,
  UserRoles.BASIC_USER
];

export const fetchAssignedToDropdown = async () => {
  const result= await apiRequest(API_METHODS.GET, API_ENDPOINTS.fetchAssignedToDropdown);
  return result;
};

export const marketingSourcesDropdown=async()=>{
  const result=await apiRequest(API_METHODS.GET,API_ENDPOINTS.fetchMarketingSourcesDropdown);
  return result;
}

export const cityDropdown=async()=>{
  const result=await apiRequest(API_METHODS.GET,API_ENDPOINTS.fetchCityDropdown);
  return result;
}