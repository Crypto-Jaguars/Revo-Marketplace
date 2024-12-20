'use client';

import { ClaimEscrowForm } from '@/components/shared/ClaimEscrowForm';
import { useClaimEscrowEarningsHook } from './hooks/claim-escrow-earnings.hook';
import { useTranslations } from 'next-intl';

// Define strict types for form fields
type FormField = {
  name: 'contractId' | 'engagementId';
  label: string;
  placeholder: string;
  description?: string;
  validation: {
    required?: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
  };
  aria: {
    required: boolean;
    invalid: boolean;
    describedBy?: string;
  };
};

type TranslationKeys = 
  | 'title'
  | 'subtitle'
  | 'submitButtonText'
  | 'fields.contractId.label'
  | 'fields.contractId.placeholder'
  | 'fields.contractId.description'
  | 'fields.engagementId.label'
  | 'fields.engagementId.placeholder'
  | 'validation.contractId.required'
  | 'validation.contractId.format'
  | 'validation.engagementId.required'
  | 'validation.engagementId.format';

export function ClaimEscrowEarningsForm() {
  const { form, onSubmit } = useClaimEscrowEarningsHook();
  const t = useTranslations<TranslationKeys>('ClaimEscrowEarningsForm');

  const fields: FormField[] = [
    {
      name: 'contractId',
      label: t('fields.contractId.label'),
      placeholder: t('fields.contractId.placeholder'),
      description: t('fields.contractId.description'),
      validation: {
        required: t('validation.contractId.required'),
        pattern: {
          value: /^[A-Z0-9-]+$/,
          message: t('validation.contractId.format')
        },
        minLength: {
          value: 3,
          message: 'Contract ID must be at least 3 characters'
        }
      },
      aria: {
        required: true,
        invalid: !!form.formState.errors.contractId,
        describedBy: 'contractId-description'
      }
    },
    {
      name: 'engagementId',
      label: t('fields.engagementId.label'),
      placeholder: t('fields.engagementId.placeholder'),
      validation: {
        required: t('validation.engagementId.required'),
        pattern: {
          value: /^[A-Z0-9-]+$/,
          message: t('validation.engagementId.format')
        }
      },
      aria: {
        required: true,
        invalid: !!form.formState.errors.engagementId
      }
    }
  ];

  return (
    <ClaimEscrowForm
      title={t('title')}
      subtitle={t('subtitle')}
      fields={fields}
      form={form}
      onSubmit={onSubmit}
      submitButtonText={t('submitButtonText')}
      testId="claim-escrow-form"
    />
  );
}