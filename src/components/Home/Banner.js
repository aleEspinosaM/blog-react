import React from 'react';

const Banner = ({appName}) => {
    return (
        <div>
            <div className="banner">
                <div className="container">
                    <h1 className="logo-font">
                        {appName.toLowerCase()}
                    </h1>
                    <p>Where you can be who you want to be.</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;