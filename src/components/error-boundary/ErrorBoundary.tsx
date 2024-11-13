import React, { Component, ReactNode } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

type ErrorBoundaryProps = {
  children: ReactNode;
  navigate: NavigateFunction;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // 오류가 발생하면 hasError 상태를 true로 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // 오류를 로깅할 수 있습니다.
    console.error('Error caught by ErrorBoundary11:', this.props, error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      this.props.navigate('/error');
      return null;
    }

    // 오류가 없으면 자식 컴포넌트를 그대로 렌더링합니다.
    return this.props.children;
  }
}

export default function ErrorBoundaryWrapper({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
}
