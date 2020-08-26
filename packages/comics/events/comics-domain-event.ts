import { DomainEvent } from "@marvel/infrastructure";

export class ComicsDomainEvent extends DomainEvent {
  static domainName = "comics";
}
