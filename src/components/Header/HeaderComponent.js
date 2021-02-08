import React, { memo } from 'react';
import logo from '../../assets/images/logo.png';

const HeaderComponent = memo(() => (
    <header>
        <img src={logo} alt="Logo" />
    </header>
));

export { HeaderComponent };
