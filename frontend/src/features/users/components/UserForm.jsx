import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from '../schemas/userSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Button } from '../../../shared/components/ui/Button';

export const UserForm = ({ onSubmit, submitting }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: 'STAFF',
      phone: '',
      department: '',
    },
  });

  const submitAndReset = async (values) => {
    await onSubmit(values);
    reset();
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitAndReset)}>
      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Name</label>
          <Input {...register('name')} />
          {errors.name ? <p className="mt-1 text-xs text-red-600">{errors.name.message}</p> : null}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <Input type="email" {...register('email')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <Input type="password" {...register('password')} />
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <label className="mb-1 block text-sm font-medium">Role</label>
          <Select {...register('role')}>
            <option value="ADMIN">ADMIN</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="STAFF">STAFF</option>
            <option value="RESEARCH_ADMIN">RESEARCH_ADMIN</option>
          </Select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <Input {...register('phone')} />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Department</label>
          <Input {...register('department')} />
        </div>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? 'Saving...' : 'Create User'}
      </Button>
    </form>
  );
};
