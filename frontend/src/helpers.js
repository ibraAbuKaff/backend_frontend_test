import createHistory from "history/createBrowserHistory";

export const redirectToUserPage = (userType) => {
    const history = createHistory({
        //forceRefresh: true
        hashType: 'hashbang'
    });

    if (userType === 'supplier') {
        history.push({
            pathname: '/supplier',
        });
        window.location.reload()
    }

    if (userType === 'contractor') {
        history.push({
            pathname: '/contractor',
        });

        window.location.reload()
    }
};

export const doLogout = () => {
    const history = createHistory({
        //forceRefresh: true
        hashType: 'hashbang'
    });

    history.push({
        pathname: '/',
    });

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userType');
    window.location.reload()

}