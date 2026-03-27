import { FilterDef } from '@mikro-orm/core';

export type SoftDeleteOptions = {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
};

const defaultOptions = {
  enabled: true,
  defaultIsDeleted: false,
  field: 'deletedAt',
};

export const softDeleteFilter = (
  options: SoftDeleteOptions = {},
): FilterDef<any> => {
  const { enabled, defaultIsDeleted, field } = {
    ...defaultOptions,
    ...options,
  };

  return {
    name: 'softDelete',
    cond: ({ isDeleted = defaultIsDeleted }: { isDeleted?: boolean } = {}) =>
      isDeleted
        ? { [field]: { $ne: null } }
        : isDeleted === false
          ? { [field]: null }
          : {},
    args: false,
    default: enabled,
  };
};
