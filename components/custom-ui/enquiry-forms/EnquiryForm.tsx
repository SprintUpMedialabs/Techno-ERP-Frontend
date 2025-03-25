import React from 'react'
import DynamicForm from '../dynamic-form/DynamicForm'
import logger from '@/lib/logger';
import { EnquiryFormFields } from './fields';

const EnquiryForm = () => {

    const onSubmit = (data: any) => {
        logger.info(data)
    };

  return (
    <DynamicForm sections={EnquiryFormFields} onSubmit={onSubmit}/>
  )
}

export default EnquiryForm