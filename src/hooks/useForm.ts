import { useCallback, useState } from "react";

interface UseFormOptions<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
  onSubmit: (values: T) => Promise<void>;
}

export const useForm = <T extends Record<string, string>>(
  options: UseFormOptions<T>,
) => {
  const { initialValues, validate, onSubmit } = options;
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (name: keyof T, value: string) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        const validationErrors = validate({ ...values, [name]: value });
        setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
      }
    },
    [values, touched, validate],
  );

  const handleBlur = useCallback(
    (name: keyof T) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      const validationErrors = validate(values);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    },
    [values, validate],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) return;

      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, validate, onSubmit],
  );

  const isValid = Object.keys(errors).length === 0;

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
