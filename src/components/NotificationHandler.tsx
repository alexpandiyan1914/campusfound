import React, {
    useContext,
    useEffect,
    useRef,
} from "react";

import * as Notifications
    from "expo-notifications";

import AuthContext
    from "../context/AuthContext";

import {
    handleNotificationNavigation,
    parseNotificationData,
} from "../utils/notificationNavigation";

interface PendingNotification {
    identifier: string;
    data: Record<string, unknown>;
}

const NotificationHandler =
    () => {
        const auth =
            useContext(AuthContext);

        const pendingNotification =
            useRef<
                PendingNotification | null
            >(null);

        const lastHandledIdentifier =
            useRef<string | null>(
                null
            );

        const processNotification =
            async (
                identifier: string,
                data:
                    Record<string, unknown>
            ) => {
                if (
                    !auth ||
                    auth.loading ||
                    !auth.isAuthenticated
                ) {
                    pendingNotification.current =
                    {
                        identifier,
                        data,
                    };

                    return;
                }

                if (
                    lastHandledIdentifier.current ===
                    identifier
                ) {
                    return;
                }

                const parsedData =
                    parseNotificationData(
                        data
                    );

                if (!parsedData) {
                    return;
                }

                const handled =
                    await handleNotificationNavigation(
                        parsedData
                    );

                if (handled) {
                    lastHandledIdentifier.current =
                        identifier;

                    pendingNotification.current =
                        null;
                } else {
                    pendingNotification.current =
                    {
                        identifier,
                        data,
                    };
                }
            };

        useEffect(() => {
            const subscription =
                Notifications
                    .addNotificationResponseReceivedListener(
                        response => {
                            const request =
                                response.notification
                                    .request;

                            void processNotification(
                                request.identifier,
                                request.content
                                    .data as Record<
                                        string,
                                        unknown
                                    >
                            );
                        }
                    );

            return () => {
                subscription.remove();
            };
        }, [
            auth?.loading,
            auth?.isAuthenticated,
        ]);

        useEffect(() => {
            const handleInitialNotification =
                async () => {
                    if (
                        !auth ||
                        auth.loading ||
                        !auth.isAuthenticated
                    ) {
                        return;
                    }

                    const response =
                        await Notifications
                            .getLastNotificationResponseAsync();

                    if (!response) {
                        return;
                    }

                    const request =
                        response.notification
                            .request;

                    await processNotification(
                        request.identifier,
                        request.content
                            .data as Record<
                                string,
                                unknown
                            >
                    );
                };

            void handleInitialNotification();
        }, [
            auth?.loading,
            auth?.isAuthenticated,
        ]);

        useEffect(() => {
            if (
                !auth ||
                auth.loading ||
                !auth.isAuthenticated
            ) {
                return;
            }

            const pending =
                pendingNotification.current;

            if (!pending) {
                return;
            }

            void processNotification(
                pending.identifier,
                pending.data
            );
        }, [
            auth?.loading,
            auth?.isAuthenticated,
        ]);

        return null;
    };

export default NotificationHandler;