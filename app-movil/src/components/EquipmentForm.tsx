

import { useEffect } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import FormField from './FormField';
import {
  equipmentSchema,
  type EquipmentFormValues,
  type EquipmentFormData,
} from '../schemas/equipmentSchema';

type EquipmentFormProps = {
  initialValues?: EquipmentFormValues;
  onSubmit: (data: EquipmentFormData) => Promise<void>;
  submitLabel: string;
  saving: boolean;
  submitError?: string;
  onCancel?: () => void;
};

const emptyValues: EquipmentFormValues = {
  name: '',
  category: '',
  brand: '',
  quantity: '',
  status: 'Disponible',
  pricePerDay: '',
  description: '',
};

export default function EquipmentForm({
  initialValues,
  onSubmit,
  submitLabel,
  saving,
  submitError = '',
  onCancel,
}: EquipmentFormProps) {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<EquipmentFormValues, unknown, EquipmentFormData>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: initialValues ?? emptyValues,
  });

  useEffect(() => {
    reset(initialValues ?? emptyValues);
  }, [initialValues, reset]);

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{submitLabel}</Text>

      <FormField
        control={control}
        name="name"
        label="Nombre del equipo"
        placeholder="Ej. Parlante profesional"
      />

      <FormField
        control={control}
        name="category"
        label="Categoría"
        placeholder="Ej. Sonido"
      />

      <FormField
        control={control}
        name="brand"
        label="Marca"
        placeholder="Ej. Sony"
      />

      <FormField
        control={control}
        name="quantity"
        label="Cantidad"
        placeholder="Ej. 5"
        keyboardType="numeric"
      />

      <FormField
        control={control}
        name="status"
        label="Estado"
        placeholder="Disponible"
      />

      <FormField
        control={control}
        name="pricePerDay"
        label="Precio por día (COP)"
        placeholder="Ej. 50000"
        keyboardType="numeric"
      />

      <FormField
        control={control}
        name="description"
        label="Descripción"
        placeholder="Describe las características del equipo"
        multiline
      />

      {!!submitError && (
        <Text style={styles.error}>{submitError}</Text>
      )}

      <Pressable
        style={[
          styles.submitButton,
          saving && styles.disabledButton,
        ]}
        onPress={() => {
          void handleSubmit(onSubmit)();
        }}
        disabled={saving}
      >
        <Text style={styles.submitText}>
          {saving ? 'Guardando...' : submitLabel}
        </Text>
      </Pressable>

      {onCancel && (
        <Pressable
          onPress={onCancel}
          style={[
            styles.cancelButton,
            saving && styles.disabledButton,
          ]}
          disabled={saving}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  error: {
    color: '#F87171',
    fontSize: 13,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#D6A84F',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelButton: {
    backgroundColor: '#292044',
    borderColor: '#7C3AED',
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
