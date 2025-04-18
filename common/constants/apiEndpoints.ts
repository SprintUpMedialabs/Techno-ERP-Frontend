import { updateEnquiryStep3 } from "@/components/custom-ui/enquiry-form/stage-3/helper/apirequests";

export const API_DOMAIN = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {

  // Auth
  login: `${API_DOMAIN}/auth/login`,
  profile: `${API_DOMAIN}/user/profile`,
  register: `${API_DOMAIN}/auth/register`,
  send_otp: `${API_DOMAIN}/auth/send-otp`,
  verify_otp: `${API_DOMAIN}/auth/verify-otp`,
  forgot_password: `${API_DOMAIN}/auth/forgot-password`,
  update_password: `${API_DOMAIN}/auth/update-password`,
  logout: `${API_DOMAIN}/auth/logout`,
  isAuthenticated: `${API_DOMAIN}/auth/is-authenticated`,

  // Marketing
  getAllLeads: `${API_DOMAIN}/crm/fetch-data`,
  getAllLeadsAnalytics: `${API_DOMAIN}/crm/analytics`,
  fetchAssignedToDropdown: `${API_DOMAIN}/user/fetch-dropdown?role=EMPLOYEE_MARKETING&moduleName=MARKETING`,
  updateLead: `${API_DOMAIN}/crm/edit`,

  getAdminAnalytics: `${API_DOMAIN}/crm/admin/analytics`,

  getYellowLeads: `${API_DOMAIN}/crm/yellow-lead`,
  getYellowLeadsAnalytics: `${API_DOMAIN}/crm/yellow-lead-analytics`,
  updateYellowLead: `${API_DOMAIN}/crm/update-yellow-lead`,

  // Admissions
  admissionData: `${API_DOMAIN}/admission/enquiry/search`,
  getEnquiry: (enquiry_id : string) => `${API_DOMAIN}/admission/enquiry/${enquiry_id}`,
  createEnquiry: `${API_DOMAIN}/admission/enquiry/step-1`,
  updateEnquiry: `${API_DOMAIN}/admission/enquiry/step-1`,

  createEnquiryDraft: `${API_DOMAIN}/admission/enquiry/create-draft-step-1`,
  updateEnquiryDraft: `${API_DOMAIN}/admission/enquiry/update-draft-step-1`,

  updateEnquiryStatus: `${API_DOMAIN}/admission/enquiry/update-status`,

  fetchTeleCallersDropdown: `${API_DOMAIN}/user/fetch-dropdown?role=EMPLOYEE_MARKETING&moduleName=ADMISSION`,
  fetchCounsellorsDropdown: `${API_DOMAIN}/user/fetch-dropdown?role=COUNSELOR&moduleName=ADMISSION`,
  fetchMarketingSourcesDropdown: `${API_DOMAIN}/dropdown/MAKRETING_SOURCE`,
  fetchCityDropdown: `${API_DOMAIN}/dropdown/CITY`,

  // Fees Details
  getOtherFees: `${API_DOMAIN}/fees-structure/other-fees`,
  getFeesByCourse: (course_name: string) => `${API_DOMAIN}/fees-structure/course/${course_name}`,

  createStudentFees: `${API_DOMAIN}/admission/enquiry/step-2`,
  updateStudentFees: `${API_DOMAIN}/admission/enquiry/step-2`,

  createStudentFeesDraft: `${API_DOMAIN}/admission/enquiry/create-draft-step-2`,
  updateStudentFeesDraft: `${API_DOMAIN}/admission/enquiry/update-draft-step-2`,

  createEnquiryStep4: `${API_DOMAIN}/admission/enquiry/step-4`,
  updateEnquiryStep4: `${API_DOMAIN}/admission/enquiry/step-4`,

  updateEnquiryDraftStep3: `${API_DOMAIN}/admission/enquiry/save-draft-step-3`,
  updateEnquiryStep3: `${API_DOMAIN}/admission/enquiry/step-3`,

  // Document Upload
  uploadDocument: `${API_DOMAIN}/admission/enquiry/update-document`,

};
