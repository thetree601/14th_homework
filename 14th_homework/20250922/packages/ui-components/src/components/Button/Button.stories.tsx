import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Button from './index';

const meta = {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '다양한 스타일과 크기의 버튼 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost'],
      description: '버튼의 스타일 변형',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '버튼 비활성화 여부',
    },
    loading: {
      control: { type: 'boolean' },
      description: '로딩 상태 표시 여부',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: '전체 너비 사용 여부',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'HTML 버튼 타입',
    },
    children: {
      control: { type: 'text' },
      description: '버튼 내부 텍스트',
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 버튼
export const Default: Story = {
  args: {
    children: '버튼',
  },
};

// Primary 버튼
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary 버튼',
  },
};

// Secondary 버튼
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary 버튼',
  },
};

// Danger 버튼
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger 버튼',
  },
};

// Ghost 버튼
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost 버튼',
  },
};

// 크기 변형
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Small 버튼',
  },
};

export const Medium: Story = {
  args: {
    size: 'medium',
    children: 'Medium 버튼',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Large 버튼',
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    disabled: true,
    children: '비활성화된 버튼',
  },
};

// 로딩 상태
export const Loading: Story = {
  args: {
    loading: true,
    children: '로딩 중...',
  },
};

// 전체 너비
export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: '전체 너비 버튼',
  },
  parameters: {
    layout: 'padded',
  },
};

// 모든 변형 조합 예시
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Button size="small">Small</Button>
        <Button size="medium">Medium</Button>
        <Button size="large">Large</Button>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button disabled>Disabled</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '모든 버튼 변형을 한 번에 확인할 수 있습니다.',
      },
    },
  },
};
