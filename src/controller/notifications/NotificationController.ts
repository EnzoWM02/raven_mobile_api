import { Notification } from "@prisma/client";
import { NextFunction, Request, Response, Router } from "express";
import NotificationsService, { NotificationDTO } from "services/notifications/NotificationsService";
import HttpError from "utils/HttpError";

const notificationControllerRouter = Router();
const notificationsService = new NotificationsService();

interface NotificationRequest extends Request {
    body: NotificationDTO
}

notificationControllerRouter.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {
    const userId = parseInt(req.params.userId);
    if (!userId) return next(new HttpError(`This request needs an user id`, 405));

    try {
        const notifications = await notificationsService.findNotificationsByUserId(userId);
        res.status(200).send(notifications);
    } catch (e) {
        next(new HttpError('Unable to get notifications for user', 404, e));
    }
})

notificationControllerRouter.post('/', async (req: NotificationRequest, res: Response, next: NextFunction) => {
    try {
        const notification = await notificationsService.createNotification(req.body);
        res.status(201).send(notification);
    } catch (e) {
        next(new HttpError('Could not create notification', 404, e));
    }
})

notificationControllerRouter.delete('/:id', async (req: NotificationRequest, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (!id) return next(new HttpError(`This request needs a notification id`, 405));

    try {
        const notification = await notificationsService.disableNotification(id);
        res.status(200).send(notification)
    } catch (e) {
        next(new HttpError('Could not disable notification', 404, e));
    }
})

export default notificationControllerRouter;