// hoc
import React, { useState, useEffect } from 'react';

const withDataFetching = (url) => (WrappedComponent) => {
    return () => {
        const [data, setData] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState('');

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(url);
                    const result = await response.json();
                    setData(result);
                    setLoading(false);
                } catch (error) {
                    setError(error.message);
                    setLoading(false);
                }
            };

            fetchData();
        }, []);

        return (
            <WrappedComponent
                data={data}
                loading={loading}
                error={error}
            />
        );
    };
}
export default withDataFetching;