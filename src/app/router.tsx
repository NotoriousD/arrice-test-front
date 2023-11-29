import React, { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { NavigationWrapper } from 'features/NavigationWrapper'

const HomePage = lazy(() =>
    import('pages/HomePage').then((module) => ({ default: module.HomePage }))
);

const ChatPage = lazy(() =>
    import('pages/ChatPage').then((module) => ({ default: module.ChatPage }))
);

export const router = createBrowserRouter([
    {
        path: '/',
        element: <NavigationWrapper />,
        children: [
            {
                path: '/',
                element: <HomePage />
            },
            {
                path: '/:room',
                element: <ChatPage />,
            }
        ]
    },
    {
        path: '*',
        element: <>404</>,
    },
]);
