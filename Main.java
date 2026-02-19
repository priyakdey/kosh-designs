// NOTE: remove `consumes` from @RequestMapping - GET has no request body,
// so Spring rejects requests that don't send Content-Type: application/json,
// which is what was causing the application/problem+json error response.

@RestController
@RequestMapping(value = "/api/v1/credit-cards", produces = APPLICATION_JSON_VALUE)
public class CreditCardsController {

    record Summary(
            long totalOutstanding,
            long totalCreditLimit,
            double utilizationPercent,
            int activeCards,
            long dueIn7Days,
            long minDue
    ) {}

    record Card(
            String id,
            String bankName,
            String cardVariant,
            String network,
            String last4,
            String holderName,
            long outstanding,
            long creditLimit,
            String dueDate,
            String billingDate,
            String themeId
    ) {}

    record UtilizationEntry(
            String cardId,
            String label,
            int percent
    ) {}

    record TimelineEntry(
            String cardId,
            String date,
            String label,
            long amount,
            String severity
    ) {}

    record RecentActivity(
            String id,
            String date,
            String cardLabel,
            String merchant,
            long amount
    ) {}

    record CreditCardsResponse(
            Summary summary,
            List<Card> cards,
            List<UtilizationEntry> utilization,
            List<TimelineEntry> timeline,
            List<RecentActivity> recentActivity
    ) {}

    @GetMapping
    public ResponseEntity<CreditCardsResponse> getCreditCards(java.security.Principal principal) {
        // holderName comes from the authenticated user; each card on the account
        // belongs to that holder. In a family view, cards would carry their own
        // userId and the name would be resolved per-card from a UserService.
        String holderName = principal != null ? principal.getName() : "Unknown";

        var summary = new Summary(138450, 400000, 34.6, 3, 48200, 6920);

        var cards = List.of(
                new Card("card-1", "HDFC Bank",        "Regalia",    "visa",       "4821", holderName, 78000,  100000, "2026-02-18", "2026-02-05", "slate-red"),
                new Card("card-2", "ICICI Bank",       "Amazon Pay", "visa",       "1960", holderName, 42000,  100000, "2026-02-22", "2026-02-10", "slate-blue"),
                new Card("card-3", "SBI Card",         "Cashback",   "rupay",      "7754", holderName, 18450,  100000, "2026-03-02", "2026-02-17", "zinc-emerald"),
                new Card("card-4", "Axis Bank",        "Magnus",     "visa",       "3391", holderName, 56300,  250000, "2026-02-24", "2026-02-11", "indigo-violet"),
                new Card("card-5", "Kotak",            "Zen",        "mastercard", "6184", holderName, 22100,   90000, "2026-02-20", "2026-02-07", "cyan-sky"),
                new Card("card-6", "American Express", "Gold",       "amex",       "0917", holderName, 30900,  150000, "2026-02-27", "2026-02-14", "amber-orange"),
                new Card("card-7", "IndusInd",         "Legend",     "mastercard", "5508", holderName, 12750,   80000, "2026-02-19", "2026-02-06", "lime-emerald"),
                new Card("card-8", "YES Bank",         "Prosperity", "rupay",      "7305", holderName, 40200,  120000, "2026-02-26", "2026-02-13", "neutral-gray")
        );

        var utilization = List.of(
                new UtilizationEntry("card-1", "HDFC Regalia \u2022\u2022\u2022\u2022 4821",      78),
                new UtilizationEntry("card-2", "ICICI Amazon Pay \u2022\u2022\u2022\u2022 1960",  42),
                new UtilizationEntry("card-3", "SBI Cashback \u2022\u2022\u2022\u2022 7754",      14),
                new UtilizationEntry("card-3", "SBI Cashback \u2022\u2022\u2022\u2022 7754",      14),
                new UtilizationEntry("card-3", "SBI Cashback \u2022\u2022\u2022\u2022 7754",      14),
                new UtilizationEntry("card-3", "SBI Cashback \u2022\u2022\u2022\u2022 7754",      14)
        );

        var timeline = List.of(
                new TimelineEntry("card-1", "18/02/2026", "HDFC Regalia due",    32500, "high"),
                new TimelineEntry("card-2", "22/02/2026", "ICICI Amazon Pay due",15700, "medium"),
                new TimelineEntry("card-3", "02/03/2026", "SBI Cashback due",     8900, "low")
        );

        var recentActivity = List.of(
                new RecentActivity("act-1", "2026-02-14", "HDFC \u2022\u2022\u2022\u2022 4821",  "Air India",    21300),
                new RecentActivity("act-2", "2026-02-13", "ICICI \u2022\u2022\u2022\u2022 1960", "Amazon India",  8940),
                new RecentActivity("act-3", "2026-02-12", "SBI \u2022\u2022\u2022\u2022 7754",   "Zomato",        1260)
        );

        return ResponseEntity.ok(new CreditCardsResponse(summary, cards, utilization, timeline, recentActivity));
    }
}
