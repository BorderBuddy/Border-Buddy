import React from 'react';
import Form from '../FormContainer';
import AdminFormExtension from '../AdminFormExtension';

export default (props) =>  (
  <Form {...props} formTitle={props.title} isAdmin={true} >
    <AdminFormExtension {...props} />
  </Form>
)