import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { Nationality, Qualification } from '../schema/schema';
import { AreaType, BloodGroup, Category, Religion, StatesOfIndia } from '@/types/enum';
import { useEffect, useState } from 'react';
import { formSchemaStep3 } from './enquiry-form-stage-3';
interface MoreDetailsSectionInterface {
  form: UseFormReturn<any>;
  commonFormItemClass: string;
  commonFieldClass: string;
}

const MoreDetailsSection: React.FC<MoreDetailsSectionInterface> = ({
  form,
  commonFieldClass,
  commonFormItemClass
}) => {
  const [isValid, setIsValid] = useState(false);

  const checkValidity = () => {
    const values = form.getValues();

    const moreDetails = {
      stateOfDomicile: values.stateOfDomicile,
      areaType: values.areaType,
      nationality: values.nationality,
      religion: values.religion,
      category: values.category,
      bloodGroup: values.bloodGroup,
      aadharNumber: values.aadharNumber
    };

    const result = formSchemaStep3
      .pick({
        stateOfDomicile: true,
        areaType: true,
        nationality: true,
        religion: true,
        category: true,
        bloodGroup: true,
        aadharNumber: true
      })
      .safeParse(moreDetails);

    setIsValid(result.success);
  };

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      checkValidity();
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    checkValidity();
  }, []);

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="student-details">
        <div className="space-y-2">
          <AccordionTrigger className="w-full items-center">
            <div className="flex items-center w-full">
              <h3 className="font-inter text-[16px] font-semibold">More details</h3>
              {isValid && (
                <svg
                  className="ml-2 h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                    fill="#22C55E"
                  />
                  <path
                    d="M8 12L11 15L16 9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <hr className="flex-1 border-t border-[#DADADA] ml-2" />
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-6 gap-x-[32px] bg-white p-4 rounded-[10px]">
              <FormField
                key="stateOfDomicile"
                control={form.control}
                name="stateOfDomicile"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      State Of Domicile
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Select the state" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(StatesOfIndia).map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="areaType"
                control={form.control}
                name="areaType"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      Area Type
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Select the area type" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(AreaType).map((area) => (
                            <SelectItem key={area} value={area}>
                              {area}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="nationality"
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      Nationality
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Enter the nationality" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Nationality).map((nationality) => (
                            <SelectItem key={nationality} value={nationality}>
                              {nationality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="religion"
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      Religion
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Select the religion" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Religion).map((religion) => (
                            <SelectItem key={religion} value={religion}>
                              {religion}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="category"
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666] gap-x-1">
                      Category
                      <span className="text-red-500 pl-0">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Select the religion" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Category).map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="bloodGroup"
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1 col-start-1`}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      Blood Group
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`${commonFieldClass} w-full`}>
                          <SelectValue placeholder="Select the blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(BloodGroup).map((bloodGroup) => (
                            <SelectItem key={bloodGroup} value={bloodGroup}>
                              {bloodGroup}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                key="aadharNumber"
                control={form.control}
                name="aadharNumber"
                render={({ field }) => (
                  <FormItem className={`${commonFormItemClass} col-span-1 `}>
                    <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                      Aadhaar Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        className={commonFieldClass}
                        placeholder="Enter the Aadhaar number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default MoreDetailsSection;
