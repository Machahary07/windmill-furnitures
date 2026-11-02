import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { input, label as labelClass, textarea } from "@/components/ui/styles";

type Base = { label: string; name: string; error?: string; hint?: ReactNode; className?: string };

function Wrapper({ id, label, error, hint, className, children }: Omit<Base, "name"> & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 font-jakarta text-[12px] font-medium text-red">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 font-jakarta text-[12px] text-gray-nav">{hint}</p>
      )}
    </div>
  );
}

const a11y = (id: string, error?: string) => ({
  id,
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

export function TextField({ label, name, error, hint, className, ...rest }: Base & InputHTMLAttributes<HTMLInputElement>) {
  const id = rest.id ?? `f-${name}`;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} className={className}>
      <input name={name} className={input} {...rest} {...a11y(id, error)} />
    </Wrapper>
  );
}

export function TextAreaField({ label, name, error, hint, className, ...rest }: Base & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = rest.id ?? `f-${name}`;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} className={className}>
      <textarea name={name} className={textarea} {...rest} {...a11y(id, error)} />
    </Wrapper>
  );
}

export function SelectField({
  label,
  name,
  error,
  hint,
  className,
  options,
  placeholder,
  ...rest
}: Base & SelectHTMLAttributes<HTMLSelectElement> & { options: readonly (string | { value: string; label: string })[]; placeholder?: string }) {
  const id = rest.id ?? `f-${name}`;
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} className={className}>
      <select name={name} className={`${input} cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='10'%20height='10'%20viewBox='0%200%2010%2010'%3E%3Cpath%20d='M1.5%203.5%205%207l3.5-3.5'%20fill='none'%20stroke='%23111'%20stroke-width='1.5'/%3E%3C/svg%3E")] bg-[position:right_14px_center] bg-no-repeat pr-9`} {...rest} {...a11y(id, error)}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => {
          const { value, label: text } = typeof o === "string" ? { value: o, label: o } : o;
          return (
            <option key={value} value={value}>
              {text}
            </option>
          );
        })}
      </select>
    </Wrapper>
  );
}
