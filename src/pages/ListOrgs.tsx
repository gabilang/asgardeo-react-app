// import React, { useEffect, useState } from 'react';
// import { useAuthContext } from '@asgardeo/auth-react';

// const useValidateUser = () => {
//     const { httpRequest } = useAuthContext();
//     const usersManagementApiUrl = 'https://devant.choreoapps.dev/user-mgt/1.0.0';

//     const validateUser = async () => {
//         const response = await httpRequest({
//             url: `${usersManagementApiUrl}/validate/user`,
//             method: 'GET',
//         });
//         const { data } = response;
//         if (data?.organizations.length) {
//             const { organizations, idpId, isNewUserSignup } = data;
//             return {
//                 organizations,
//                 idpId,
//                 isNewUserSignup,
//             };
//         }

//         throw new Error('No organizations found for the user');
//     };
//     return { validateUser };
// };

// const ListOrgs: React.FC = () => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState(null);
//     const { validateUser } = useValidateUser();

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const userData = await validateUser();
//                 setData(userData);
//             } catch (err) {
//                 setError(err);
//             }
//         };

//         fetchData();
//     }, [validateUser]);

//     if (error) {
//         return <div>Error: {error.message}</div>;
//     }

//     if (!data) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>User Organizations</h1>
//             <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//     );
// };

// export default ListOrgs;



import React, { useEffect, useState } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';

const useValidateUser = () => {
    const { httpRequest } = useAuthContext();
    const usersManagementApiUrl = 'https://apis.preview-dv.choreo.dev/user-mgt/1.0.0';

    const validateUser = async () => {
        const response = await httpRequest({
            url: `${usersManagementApiUrl}/validate/user`,
            method: 'GET',
        });
        const { data } = response;
        if (data?.organizations.length) {
            const { organizations, idpId, isNewUserSignup } = data;
            return {
                organizations,
                idpId,
                isNewUserSignup,
            };
        }
        
        throw new Error('No organizations found for the user');
    };
    return { validateUser };
};

const ListOrgs: React.FC = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { validateUser } = useValidateUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await validateUser();
                setData(userData);
            } catch (err) {
                setError(err);
            }
        };

        fetchData();
    }, [validateUser]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>User Organizations</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default ListOrgs;

