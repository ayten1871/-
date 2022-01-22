const commonTitles = {
    Phone: '服務電話',
    WebsiteUrl: '官方網站',
    Organizer: '主辦單位',
    TicketInfo: '票價資訊',
    Charge: '活動費用',
    Remarks: '注意事項',
    OpenTime: ['開放時間', '活動時間', '營業時間'],
    Address: ['景點地址', '活動地點', '餐廳地址'],
    Phone: ['服務電話', '聯絡電話', '聯絡電話'],
};

export class SortData {
    constructor(data, sort) {
        this.data = data;
        this.sort = sort;
    }
    sortData() {
        let {
            ID,
            Phone,
            Address,
            StartTime,
            EndTime,
            City,
            Organizer,
            WebsiteUrl,
            Remarks,
            Charge,
            TicketInfo,
            OpenTime,
        } = this.data;
        //console.log(data)
        const keys = Object.keys(this.data);
        let usedTitles = [];
        keys.map((key) => {
            commonTitles[key] !== undefined && usedTitles.push(commonTitles[key]);
        });
        return usedTitles;
    }
}
