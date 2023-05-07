import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.includes('how to test my video')) {
      actions.handle1();
    }

    if (message.includes('how to check my profile')) {
      actions.handle2();
    }

    if (message.includes('Can I correct an erroneous exercise?')) {
      actions.handle3();
    }

    if (message.includes('I wish to report a bug')) {
      actions.handle4();
    }

    if (message.includes('How can I contact you?')) {
      actions.handle5();
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;