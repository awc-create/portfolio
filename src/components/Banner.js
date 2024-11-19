import { TypeAnimation } from 'react-type-animation';

export const Banner = () => {
    return (
      <div className="banner-animation">
        <TypeAnimation
          sequence={[
            'Welcome to',
            1000,
            'Adaptive Workflow Consultancy',
            1000,
          ]}
          speed={50}
          style={{ fontSize: '2em' }}
          repeat={Infinity}
        />
      </div>
    );
  };