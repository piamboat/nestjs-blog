import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }

    async enabledShutdownHooks(app: INestApplication) {
        const self = this as any;
        self.$on('beforeExit', async () => {
            await app.close();
        });
    }
}
