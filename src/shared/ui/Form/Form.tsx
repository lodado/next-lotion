import React, { ComponentProps, forwardRef, PropsWithChildren } from 'react'

import { Control, Field, Label, Message, Root, Submit } from './components/radix'
import { cn } from '@/shared/utils'

// Root 컴포넌트 타입 정의
export type FormProps = ComponentProps<typeof Root>

const Form = forwardRef<HTMLFormElement, FormProps>(({ children, ...rest }, ref) => {
  return (
    <Root {...rest} ref={ref}>
      {children}
    </Root>
  )
})

Form.displayName = 'Form'

// Field 컴포넌트 타입 정의
export type FieldProps = ComponentProps<typeof Field>

const RawField: React.FC<FieldProps> = (props) => {
  const { className, ...rest } = props;
  return <Field {...rest} className={cn("", className)} />;
}

// Label 컴포넌트 타입 정의
type LabelProps = ComponentProps<typeof Label>

const RawLabel: React.FC<LabelProps> = (props) => {
  return <Label className="text-text-default" {...props} />;
};

// Control 컴포넌트 타입 정의
export type ControlProps = ComponentProps<typeof Control>;

const RawControl: React.FC<ControlProps> = (props) => {
  return <Control {...props} />;
};

// Message 컴포넌트 타입 정의
export type MessageProps = ComponentProps<typeof Message>;

const RawMessage: React.FC<MessageProps> = (props) => {
  const { className, ...rest } = props;
  return <Message {...rest} className={cn("text-color-text-danger caption", className)} />;
};

// Submit 컴포넌트 타입 정의
export type SubmitProps = ComponentProps<typeof Submit>;

const RawSubmit: React.FC<SubmitProps> = (props) => {
  return <Submit asChild {...props} />;
};

export const RawRequired = () => {
  return <span className="align-middle text-red-500 heading-03 ml-[0.2rem]">*</span>;
};

// Form 컴포넌트에 서브 컴포넌트 추가
interface FormComponent extends React.ForwardRefExoticComponent<FormProps & React.RefAttributes<HTMLFormElement>> {
  Field: React.FC<FieldProps>;
  Label: React.FC<LabelProps>;
  Message: React.FC<MessageProps>;
  Submit: React.FC<SubmitProps>;
  Control: React.FC<ControlProps>;
  Required: React.FC;
}

const ForwardedForm = Form as FormComponent;

ForwardedForm.Field = RawField;
ForwardedForm.Label = RawLabel;
ForwardedForm.Message = RawMessage;
ForwardedForm.Submit = RawSubmit;
ForwardedForm.Control = RawControl;
ForwardedForm.Required = RawRequired;

export default ForwardedForm
