export default class Domain implements Domain {
  domainId?: number;
  domainName: string;
  userId: string;
  createdTime?: Date;

  constructor({ domainId, domainName, userId, createdTime }: Domain) {
    this.domainId = domainId;
    this.domainName = domainName;
    this.userId = userId;
    this.createdTime = createdTime;
  }
}
