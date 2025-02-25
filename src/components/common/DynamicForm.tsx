
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'email' | 'textarea';
  validation?: any;
}

interface DynamicFormProps {
  fields: FormField[];
  initialValues: any;
  onSubmit: (values: any) => void;
  title?: string;
}

export const DynamicForm = ({ fields, initialValues, onSubmit, title }: DynamicFormProps) => {
  const validationSchema = Yup.object().shape(
    fields.reduce((acc, field) => {
      acc[field.name] = field.validation || Yup.string().required('Required');
      return acc;
    }, {} as any)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      {title && <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">{title}</h2>}
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  {field.label}
                </label>
                
                {field.type === 'date' ? (
                  <div className="relative">
                    <Field
                      type="date"
                      id={field.name}
                      name={field.name}
                      className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                ) : field.type === 'textarea' ? (
                  <Field
                    as="textarea"
                    id={field.name}
                    name={field.name}
                    className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    rows={4}
                  />
                ) : (
                  <Field
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    className="block w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                )}
                
                {errors[field.name] && touched[field.name] && (
                  <div className="text-sm text-red-600 dark:text-red-400">
                    {errors[field.name] as string}
                  </div>
                )}
              </div>
            ))}
            
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};
