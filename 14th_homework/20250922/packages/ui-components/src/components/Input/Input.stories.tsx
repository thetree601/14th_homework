import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Input from './index';

const meta = {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 타입과 스타일의 입력 필드 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: '입력 필드의 타입',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '입력 필드의 크기',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '입력 필드 비활성화 여부',
    },
    required: {
      control: { type: 'boolean' },
      description: '필수 입력 여부',
    },
    error: {
      control: { type: 'boolean' },
      description: '에러 상태 여부',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    readOnly: {
      control: { type: 'boolean' },
      description: '읽기 전용 여부',
    },
    placeholder: {
      control: { type: 'text' },
      description: '플레이스홀더 텍스트',
    },
    label: {
      control: { type: 'text' },
      description: '라벨 텍스트',
    },
    errorMessage: {
      control: { type: 'text' },
      description: '에러 메시지',
    },
  },
  args: { 
    onChange: fn(),
    onBlur: fn(),
    onFocus: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 입력 필드
export const Default: Story = {
  args: {
    placeholder: '텍스트를 입력하세요',
  },
};

// 라벨이 있는 입력 필드
export const WithLabel: Story = {
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
  },
};

// 필수 입력 필드
export const Required: Story = {
  args: {
    label: '이메일',
    type: 'email',
    required: true,
    placeholder: '이메일을 입력하세요',
  },
};

// 에러 상태
export const Error: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    error: true,
    errorMessage: '비밀번호는 8자 이상이어야 합니다',
    placeholder: '비밀번호를 입력하세요',
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 입력 필드',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    placeholder: 'Medium 입력 필드',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 입력 필드',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    label: '비활성화된 필드',
    disabled: true,
    placeholder: '입력할 수 없습니다',
  },
};

// 읽기 전용
export const ReadOnly: Story = {
  args: {
    label: '읽기 전용 필드',
    readOnly: true,
    value: '읽기 전용 값',
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    label: '전체 너비 입력 필드',
    fullWidth: true,
    placeholder: '전체 너비를 사용합니다',
  },
  parameters: {
    layout: 'padded',
  },
};

// 다양한 타입들
export const Email: Story = {
  args: {
    label: '이메일',
    type: 'email',
    placeholder: 'example@email.com',
  },
};

export const Password: Story = {
  args: {
    label: '비밀번호',
    type: 'password',
    placeholder: '비밀번호를 입력하세요',
  },
};

export const Number: Story = {
  args: {
    label: '나이',
    type: 'number',
    placeholder: '나이를 입력하세요',
  },
};

export const Tel: Story = {
  args: {
    label: '전화번호',
    type: 'tel',
    placeholder: '010-1234-5678',
  },
};

export const URL: Story = {
  args: {
    label: '웹사이트',
    type: 'url',
    placeholder: 'https://example.com',
  },
};

export const Search: Story = {
  args: {
    label: '검색',
    type: 'search',
    placeholder: '검색어를 입력하세요',
  },
};

// 모든 변형 조합 예시
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '400px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3>크기 변형</h3>
        <Input size="small" placeholder="Small" />
        <Input size="medium" placeholder="Medium" />
        <Input size="large" placeholder="Large" />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3>상태 변형</h3>
        <Input label="정상" placeholder="정상 상태" />
        <Input label="에러" error errorMessage="에러가 발생했습니다" placeholder="에러 상태" />
        <Input label="비활성화" disabled placeholder="비활성화 상태" />
        <Input label="읽기 전용" readOnly value="읽기 전용 값" />
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3>타입 변형</h3>
        <Input label="텍스트" type="text" placeholder="텍스트 입력" />
        <Input label="이메일" type="email" placeholder="이메일 입력" />
        <Input label="비밀번호" type="password" placeholder="비밀번호 입력" />
        <Input label="숫자" type="number" placeholder="숫자 입력" />
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: '모든 입력 필드 변형을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};
