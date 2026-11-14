import { Body, Controller, Post } from "@nestjs/common";
import { SubscribeDto } from "./newsletter.dto";
import { NewsletterService } from "./newsletter.service";

@Controller("newsletter")
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post()
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto);
  }
}
