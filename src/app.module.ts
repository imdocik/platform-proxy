import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { ShopifyModule } from './modules/shopify/shopify.module'
import { SUPPORTED_PLATFORM } from './shared/enums'

@Module({
  imports: [ShopifyModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        const platform = req.url.split('/')[2]

        if (platform && Object.values(SUPPORTED_PLATFORM).includes(platform)) {
          req.url = `/${platform}` + req.url.replace(`/${platform}`, '')
        }

        next()
      })
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
