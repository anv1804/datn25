import { message } from 'antd';
import { ArgsProps } from 'antd/es/message';

// Common message configuration
const defaultConfig: Partial<ArgsProps> = {
  style: { marginTop: '20px' },
  duration: 3
};

// Success message with default configuration
export const showSuccess = (content: string, config?: Partial<ArgsProps>) => {
  message.success({
    content,
    ...defaultConfig,
    duration: 2,
    ...config
  });
};

// Error message with default configuration
export const showError = (content: string, config?: Partial<ArgsProps>) => {
  message.error({
    content,
    ...defaultConfig,
    ...config
  });
};

// Warning message with default configuration
export const showWarning = (content: string, config?: Partial<ArgsProps>) => {
  message.warning({
    content,
    ...defaultConfig,
    ...config
  });
};

// Info message with default configuration
export const showInfo = (content: string, config?: Partial<ArgsProps>) => {
  message.info({
    content,
    ...defaultConfig,
    ...config
  });
};

// Loading message with default configuration
export const showLoading = (content: string, config?: Partial<ArgsProps>) => {
  return message.loading({
    content,
    ...defaultConfig,
    duration: 0, // Loading messages typically don't auto-dismiss
    ...config
  });
}; 