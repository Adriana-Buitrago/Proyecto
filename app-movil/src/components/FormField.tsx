
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from 'react-hook-form';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  type TextInputProps,
} from 'react-native';

type FormFieldProps<
  T extends FieldValues,
  TTransformedValues = T
> = {
  control: Control<T, any, TTransformedValues>;
  name: Path<T>;
  label: string;
  placeholder: string;
  keyboardType?: TextInputProps['keyboardType'];
  multiline?: boolean;
  secureTextEntry?: boolean;
};

export default function FormField<
  T extends FieldValues,
  TTransformedValues = T
>({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  secureTextEntry = false,
}: FormFieldProps<T, TTransformedValues>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Controller<T, Path<T>, TTransformedValues>
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={[
                styles.input,
                multiline && styles.multiline,
                error && styles.inputError,
              ]}
              value={value == null ? '' : String(value)}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              placeholderTextColor="#8E87A6"
              keyboardType={keyboardType}
              multiline={multiline}
              secureTextEntry={secureTextEntry}
              textAlignVertical={multiline ? 'top' : 'center'}
            />

            {error && (
              <Text style={styles.errorText}>
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 7,
  },
  input: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 10,
    padding: 13,
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputError: {
    borderColor: '#EF4444',
  },
  multiline: {
    minHeight: 90,
  },
  errorText: {
    color: '#F87171',
    fontSize: 12,
    marginTop: 5,
  },
});
