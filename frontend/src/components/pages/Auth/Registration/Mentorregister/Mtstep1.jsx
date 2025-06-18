import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../../../../schemas/MentorRegister";
import timezonesData from "../../../../common/Data/timezones.json";
import AvatarUploader from "../../../../common/Form/AvatarUploader";
import FormField from "../../../../common/Form/Formfield";

const timezones = timezonesData.timezones;

const MtStep1 = ({ onNext }) => {
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      timezone: "",
      bio: "",
      photo: null,
    },
  });

  const bioValue = watch("bio", "");

  const onSubmit = (data) => {
    const { confirmPassword, ...formData } = data;
    onNext(formData);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-6 py-10"
    >
      <FormField
        label="Full Name"
        name="name"
        type="text"
        placeholder="Enter your full name"
        {...register("name")}
        error={errors.name?.message}
      />

      <div className="w-full max-w-xl flex flex-col gap-2">
        <label className="text-base font-medium text-[#0D1C17]">
          Profile Photo
        </label>
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <AvatarUploader
              onImageChange={(blob) => {
                field.onChange(blob);
                setPreview(URL.createObjectURL(blob));
              }}
            />
          )}
        />
        {errors.photo && (
          <span className="text-red-500">{errors.photo.message}</span>
        )}
        {preview && (
          <div className="mt-4">
            <p className="text-sm text-[#4F9682]">Preview:</p>
            <img
              src={preview}
              alt="Profile preview"
              className="w-32 h-32 rounded-full object-cover border-2 border-[#D1E6E0] mt-2"
            />
          </div>
        )}
      </div>

      <FormField
        label="Contact Email"
        name="email"
        type="email"
        placeholder="Enter your email address"
        {...register("email")}
        error={errors.email?.message}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <FormField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        placeholder="Confirm your password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <div className="w-full max-w-xl rounded-xl relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register("password")}
          placeholder="Enter your password"
          className="w-full p-3 pr-10 border rounded"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        </button>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>

      <FormField
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="Enter your phone number"
        {...register("phone")}
        error={errors.phone?.message}
      />

      <div className="w-full max-w-xl flex flex-col gap-2">
        <label className="text-base font-medium text-[#0D1C17]">Timezone</label>
        <select
          {...register("timezone")}
          className="w-full p-3 pr-5 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl text-[#0D1C17] focus:outline-none"
        >
          <option value="">Select your timezone</option>
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
        {errors.timezone && (
          <span className="text-red-500">{errors.timezone.message}</span>
        )}
      </div>

      <div className="w-full max-w-xl flex flex-col gap-2">
        <label className="text-base font-medium text-[#0D1C17]">
          Professional Bio
        </label>
        <textarea
          {...register("bio")}
          placeholder="Tell us about your professional background and expertise"
          className="w-full p-3 bg-[#F7FAFA] border border-[#D1E6E0] rounded-xl min-h-[120px] text-[#0D1C17] focus:outline-none"
          maxLength={200}
        />
        <div className="text-right text-xs text-[#4F9682]">
          {bioValue.length}/200 characters
        </div>
        {errors.bio && (
          <span className="text-red-500">{errors.bio.message}</span>
        )}
      </div>

      <div className="w-full max-w-xl flex justify-end mt-4">
        <button
          type="submit"
          className="px-6 py-3 bg-[#1FE0AB] rounded-full text-sm font-bold text-[#0D1C17] hover:bg-[#13c89a] transition"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default MtStep1;
