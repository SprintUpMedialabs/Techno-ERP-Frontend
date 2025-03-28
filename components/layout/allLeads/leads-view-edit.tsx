import { useEffect, useState } from 'react';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, Pencil } from 'lucide-react';
import { Course, Gender, LeadType, Locations } from '@/static/enum';
import TechnoLeadTypeTag, {
  TechnoLeadType
} from '@/components/custom-ui/lead-type-tag/techno-lead-type-tag';
import { apiRequest } from '@/lib/apiClient';
import { API_METHODS } from '@/common/constants/apiMethods';
import { API_ENDPOINTS } from '@/common/constants/apiEndpoints';
import { Calendar } from '@/components/ui/calendar';
import { parse, format } from 'date-fns';
import { toast } from 'sonner';

interface LeadData {
  _id: string;
  name: string;
  phoneNumber: string;
  altPhoneNumber?: string;
  email: string;
  gender: string;
  location: string;
  course?: string;
  leadType?: string;
  remarks?: string;
  nextDueDate?: string;
  [key: string]: any;
}

export default function LeadViewEdit({ data }: { data: any }) {
  const [formData, setFormData] = useState<LeadData | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatDateToInput = (dateString: string) => {
    if (!dateString || dateString === '-') return '';
    try {
      const [day, month, year] = dateString.split('/');
      return `${year}-${month}-${day}`;
    } catch {
      return '';
    }
  };

  const formatDateToDisplay = (dateString: string) => {
    if (!dateString) return '';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateString;
    }
  };

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleDateChange = (name: string, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSubmit = async () => {
    if (!formData) return;

    setIsSubmitting(true);
    try {
      const allowedFields = [
        '_id',
        'name',
        'phoneNumber',
        'altPhoneNumber',
        'email',
        'gender',
        'location',
        'course',
        'leadType',
        'remarks',
        'nextDueDate'
      ];

      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key]) => allowedFields.includes(key))
      );

      const response = await apiRequest(API_METHODS.PUT, API_ENDPOINTS.updateLead, filteredData);
      if (response) {
        toast.success('Updated Lead Successfully');
      } else {
        setFormData(data);
      }
      setIsEditMode(false);
    } catch (err) {
      console.error('Error updating lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!formData) return <div>Loading...</div>;

  // Render read-only view
  const ReadOnlyView = (
    <>
      <div className="flex flex-col gap-6 text-sm">
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Date</p>
          <p>{formData.date}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Name</p>
          <p>{formData.name}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Phone number</p>
          <p>{formData.phoneNumber}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Alt number</p>
          <p>{formData.altPhoneNumber}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Email</p>
          <p>{formData.email}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Gender</p>
          <p>{formData.gender.charAt(0) + data.gender.slice(1).toLowerCase()}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Location</p>
          <p>{formData.location}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Course</p>
          <p>{formData.course}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Lead Type</p>
          <p>
            <TechnoLeadTypeTag type={formData.leadType as TechnoLeadType} />
          </p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Remarks</p>
          <p>{formData.remarks}</p>
        </div>
        <div className="flex gap-2">
          <p className="w-1/4  text-[#666666]">Next Due Date</p>
          <p>{formData.nextDueDate}</p>
        </div>
      </div>
    </>
  );

  // Render edit view
  const EditView = (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-[#666666] font-normal">Date</p>
        <p>{data.date}</p>
      </div>

      <div className="space-y-2">
        <EditLabel htmlFor="name" title={'Name'} />
        <Input
          id="name"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          className="rounded-[5px]"
        />
      </div>

      <div className="flex gap-5">
        <div className="space-y-2">
          <EditLabel htmlFor="phoneNumber" title={'Phone number'} />
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            className="rounded-[5px]"
          />
        </div>

        <div className="space-y-2">
          <EditLabel htmlFor="altPhoneNumber" title={'Alt Phone number'} />
          <Input
            id="altPhoneNumber"
            name="altPhoneNumber"
            value={formData.altPhoneNumber || ''}
            onChange={handleChange}
            className="rounded-[5px]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <EditLabel htmlFor="email" title={'Email'} />
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          className="rounded-[5px]"
        />
      </div>

      <div className="flex gap-5 w-full">
        <div className="space-y-2 w-1/2">
          <EditLabel htmlFor="gender" title={'Gender'} />
          <Select
            defaultValue={formData.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
          >
            <SelectTrigger id="gender" className="w-full rounded-[5px]">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Gender).map((gender) => (
                <SelectItem key={gender} value={gender}>
                  {gender}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-1/2">
          <EditLabel htmlFor="location" title={'Location'} />
          <Select
            defaultValue={formData.location}
            onValueChange={(value) => handleSelectChange('location', value)}
          >
            <SelectTrigger id="location" className="w-full rounded-[5px]">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Locations).map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="space-y-2 w-1/2">
          <EditLabel htmlFor="leadType" title={'Lead Type'} />
          <Select
            defaultValue={formData.leadType || ''}
            onValueChange={(value) => handleSelectChange('leadType', value)}
          >
            <SelectTrigger id="leadType" className="w-full rounded-[5px]">
              <SelectValue placeholder="Select lead type" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(TechnoLeadType).map((type) => (
                <SelectItem key={type} value={type}>
                  <TechnoLeadTypeTag type={type} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-1/2">
          <EditLabel htmlFor="course" title={'Course'} />
          <Select
            defaultValue={formData.course || ''}
            onValueChange={(value) => handleSelectChange('course', value)}
          >
            <SelectTrigger id="course" className="w-full rounded-[5px]">
              <SelectValue placeholder="Select course" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Course).map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <EditLabel htmlFor="remarks" title={'Remarks'} />
        <textarea
          id="remarks"
          name="remarks"
          value={formData.remarks || ''}
          onChange={handleChange}
          className="w-full min-h-20 px-3 py-2 border rounded-[5px]"
          placeholder="Enter remarks here"
        />
      </div>

      <div className="space-y-2 w-1/2">
        <EditLabel htmlFor="nextDueDate" title={'Next Due Date'} />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left pl-20">
              <CalendarIcon className=" left-3 h-5 w-5 text-gray-400" />
              {(() => {
                try {
                  return formData.nextDueDate
                    ? format(parse(formData.nextDueDate, 'dd/MM/yyyy', new Date()), 'dd/MM/yyyy')
                    : 'Select a date';
                } catch (e) {
                  return 'Select a date';
                }
              })()}{' '}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                formData.nextDueDate
                  ? parse(formData.nextDueDate, 'dd/MM/yyyy', new Date())
                  : undefined
              }
              onSelect={(date) => {
                const formattedDate = date ? format(date, 'dd/MM/yyyy') : '';
                handleDateChange('nextDueDate', formattedDate);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-[#666666] font-normal">Timestamp</p>
        <p>{data.createdAt}</p>
      </div>
    </>
  );

  return (
    <div className="w-full h-full max-w-2xl mx-auto border-none flex flex-col">
      <CardContent className="px-3 space-y-6 mb-20">
        {isEditMode ? EditView : ReadOnlyView}
      </CardContent>

      {isEditMode ? (
        <CardFooter className="flex w-[439px] justify-end gap-2 fixed bottom-0 right-0 shadow-[0px_-2px_10px_rgba(0,0,0,0.1)] px-[10px] py-[12px] bg-white">
          <>
            <Button
              variant="outline"
              onClick={() => {
                setFormData(data);
                setIsEditMode(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving
                </>
              ) : (
                'Save Lead'
              )}
            </Button>
          </>
        </CardFooter>
      ) : (
        <CardFooter className="flex w-[439px] justify-end gap-2 fixed bottom-0 right-0 shadow-[0px_-2px_10px_rgba(0,0,0,0.1)] px-[10px] py-[12px] bg-white">
          <div className="w-full flex">
            {formData.leadType != LeadType.YELLOW ? (
              <>
                <Button onClick={() => setIsEditMode(true)} className="ml-auto" icon={Pencil}>
                  Edit Lead
                </Button>
              </>
            ) : (
              <>
                <div className=" text-center text-sm">
                  *In case of any update please refer to Yellow Lead section
                </div>
              </>
            )}
          </div>
        </CardFooter>
      )}
    </div>
  );
}

function EditLabel({ htmlFor, title }: any) {
  return (
    <>
      <Label htmlFor={htmlFor} className="font-normal text-[#666666]">
        {title}
      </Label>
    </>
  );
}
