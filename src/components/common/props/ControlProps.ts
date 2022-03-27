export interface ControlProps<V = any, E = V> {
  value?: V;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  onChange?: (event: E) => void;
}
