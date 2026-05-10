import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { patientSchema } from '../schemas/patientSchema';
import { Input } from '../../../shared/components/ui/Input';
import { Select } from '../../../shared/components/ui/Select';
import { Checkbox } from '../../../shared/components/ui/Checkbox';
import { Button } from '../../../shared/components/ui/Button';
import { NEPAL_PROVINCES, getDistrictsByProvince } from '../../../constants/nepalLocations';

export const PatientForm = ({
  initialValues,
  onSubmit,
  submitting,
  submitLabel = 'Save Patient',
  submittingLabel = 'Saving...',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: initialValues || {
      fullName: '',
      age: '',
      gender: 'Male',
      phone: '',
      address: '',
      wardNumber: '',
      district: '',
      province: '',
      treatmentConsent: false,
      researchConsent: false,
    },
  });

  const treatmentConsent = watch('treatmentConsent');
  const researchConsent = watch('researchConsent');
  const selectedProvince = watch('province');
  const selectedDistrict = watch('district');
  const districtOptions = useMemo(() => getDistrictsByProvince(selectedProvince), [selectedProvince]);

  useEffect(() => {
    if (!selectedProvince) {
      if (selectedDistrict) setValue('district', '');
      return;
    }

    if (selectedDistrict && !districtOptions.includes(selectedDistrict)) {
      setValue('district', '');
    }
  }, [selectedDistrict, selectedProvince, districtOptions, setValue]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name</label>
          <Input {...register('fullName')} />
          {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Phone</label>
          <Input {...register('phone')} />
          {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Age</label>
          <Input type="number" {...register('age')} />
          {errors.age ? <p className="mt-1 text-xs text-red-600">{errors.age.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Gender</label>
          <Select {...register('gender')}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Province</label>
          <Select {...register('province')}>
            <option value="">Select Province</option>
            {NEPAL_PROVINCES.map((province) => (
              <option key={province.provinceNo} value={province.provinceName}>
                {province.provinceName}
              </option>
            ))}
          </Select>
          {errors.province ? <p className="mt-1 text-xs text-red-600">{errors.province.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">District</label>
          <Select {...register('district')} disabled={!selectedProvince}>
            <option value="">{selectedProvince ? 'Select District' : 'Select Province First'}</option>
            {districtOptions.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Select>
          {errors.district ? <p className="mt-1 text-xs text-red-600">{errors.district.message}</p> : null}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Ward Number</label>
          <Input {...register('wardNumber')} placeholder="e.g. 5" />
          {errors.wardNumber ? <p className="mt-1 text-xs text-red-600">{errors.wardNumber.message}</p> : null}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Address</label>
          <Input {...register('address')} />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
        <Checkbox
          label="Treatment Consent"
          checked={Boolean(treatmentConsent)}
          onChange={(event) => setValue('treatmentConsent', event.target.checked)}
        />
        <Checkbox
          label="Research Consent"
          checked={Boolean(researchConsent)}
          onChange={(event) => setValue('researchConsent', event.target.checked)}
        />
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? submittingLabel : submitLabel}
      </Button>
    </form>
  );
};
