import styled from 'styled-components';

const ButtonStyles = styled.button`
  --primary: #147bd1;
  --secondary: #f5f5f5;
  --link: transparent;

  --dark-text: #333;
  --light-text: #fff;
  --link-text: #147bd1;

  :disabled {
    color: #aaa;
  }

  background: ${({ color }) => {
    switch (color) {
      case 'primary':
        return 'var(--primary)';
      case 'secondary':
        return 'var(--secondary)';
      case 'link':
        return 'var(--link)';
      default:
        return 'var(--primary)';
    }
  }};
  color: ${({ color }) => {
    switch (color) {
      case 'primary':
        return 'var(--light-text)';
      case 'secondary':
        return 'var(--dark-text)';
      case 'link':
        return 'var(--link-text)';
      default:
        return 'var(--light-text)';
    }
  }};
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 1rem;
  border: 1pt solid var(--primary);
  border: none;
  cursor: pointer;
  :hover {
    filter: brightness(1.1);
  }
  :active {
    filter: brightness(0.9);
  }
`;

export default function Button(props) {
  return <ButtonStyles {...props} />;
}
