package com.society.management.controller;

import com.society.management.entity.*;
import com.society.management.repository.*;
import com.society.management.service.BillingService;
import com.society.management.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class SocietyManagementController {

    @Autowired private FlatRepository flatRepository;
    @Autowired private ResidentRepository residentRepository;
    @Autowired private FamilyMemberRepository familyMemberRepository;
    @Autowired private DocumentRepository documentRepository;
    @Autowired private MaintenanceBillRepository billRepository;
    @Autowired private PaymentRepository paymentRepository;
    @Autowired private ExpenseCategoryRepository expenseCategoryRepository;
    @Autowired private ExpenseRepository expenseRepository;
    @Autowired private ComplaintCategoryRepository complaintCategoryRepository;
    @Autowired private ComplaintRepository complaintRepository;
    @Autowired private ComplaintCommentRepository complaintCommentRepository;
    @Autowired private VisitorRepository visitorRepository;
    @Autowired private PreApprovedVisitorRepository preApprovedVisitorRepository;
    @Autowired private DeliveryLogRepository deliveryLogRepository;
    @Autowired private NoticeRepository noticeRepository;
    @Autowired private NoticeReadStatusRepository noticeReadStatusRepository;
    @Autowired private PollRepository pollRepository;
    @Autowired private PollOptionRepository pollOptionRepository;
    @Autowired private PollVoteRepository pollVoteRepository;
    @Autowired private ParkingSlotRepository parkingSlotRepository;
    @Autowired private VehicleRepository vehicleRepository;
    @Autowired private ParkingAllocationRepository parkingAllocationRepository;
    @Autowired private VisitorParkingRepository visitorParkingRepository;
    @Autowired private EventRepository eventRepository;
    @Autowired private EventRegistrationRepository eventRegistrationRepository;
    @Autowired private EventGalleryRepository eventGalleryRepository;
    @Autowired private AmenityRepository amenityRepository;
    @Autowired private AmenityBookingRepository amenityBookingRepository;
    @Autowired private UserRepository userRepository;

    @Autowired private BillingService billingService;
    @Autowired private ComplaintService complaintService;

    // Helper to get active user
    private User getSessionUser(HttpSession session) {
        return (User) session.getAttribute("user");
    }

    private Resident getSessionResident(HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) return null;
        return residentRepository.findByUserId(user.getId()).orElse(null);
    }

    // 1. Flats & Residents
    @GetMapping("/flats")
    public List<Flat> getAllFlats() {
        return flatRepository.findAll();
    }

    @GetMapping("/residents")
    public List<Resident> getAllResidents() {
        return residentRepository.findAll();
    }

    @GetMapping("/family-members")
    public List<FamilyMember> getFamilyMembers(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return familyMemberRepository.findByResidentId(resident.getId());
        }
        return familyMemberRepository.findAll();
    }

    @PostMapping("/family-members")
    public ResponseEntity<?> addFamilyMember(@RequestBody FamilyMember member, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only authenticated residents can add family members");
        }
        member.setResident(resident);
        return ResponseEntity.ok(familyMemberRepository.save(member));
    }

    @GetMapping("/documents")
    public List<Document> getDocuments(HttpSession session) {
        User user = getSessionUser(session);
        if (user != null && ("admin".equals(user.getRole()) || "secretary".equals(user.getRole()) || "treasurer".equals(user.getRole()))) {
            return documentRepository.findAll();
        }
        return documentRepository.findByIsPublicTrue();
    }

    // 2. Billing & Expenses
    @GetMapping("/bills")
    public List<MaintenanceBill> getBills(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return billRepository.findByResidentId(resident.getId());
        }
        return billRepository.findAll();
    }

    @PostMapping("/bills/generate")
    public ResponseEntity<?> generateBills(@RequestParam(required = false) String month) {
        LocalDate date = month != null ? LocalDate.parse(month + "-01") : LocalDate.now();
        billingService.generateBillsForMonth(date);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Bills generated successfully for " + date.getMonth().name());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/bills/{id}/pay")
    public ResponseEntity<?> payBill(@PathVariable Long id, @RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        BigDecimal amount = new BigDecimal(body.get("amount").toString());
        String method = (String) body.get("paymentMethod");
        String transactionId = (String) body.get("transactionId");
        String notes = (String) body.get("notes");
        
        Payment payment = billingService.payBill(id, amount, method, transactionId, notes, user);
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/expenses")
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @GetMapping("/expense-categories")
    public List<ExpenseCategory> getAllExpenseCategories() {
        return expenseCategoryRepository.findAll();
    }

    @PostMapping("/expenses")
    public ResponseEntity<?> createExpense(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || !"admin".equals(user.getRole()) && !"treasurer".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to create expenses");
        }
        
        Long categoryId = Long.valueOf(body.get("categoryId").toString());
        String description = (String) body.get("description");
        BigDecimal amount = new BigDecimal(body.get("amount").toString());
        String vendorName = (String) body.get("vendorName");
        String invoiceNumber = (String) body.get("invoiceNumber");
        String notes = (String) body.get("notes");

        ExpenseCategory category = expenseCategoryRepository.findById(categoryId).orElse(null);
        Expense expense = new Expense();
        expense.setCategory(category);
        expense.setDescription(description);
        expense.setAmount(amount);
        expense.setVendorName(vendorName);
        expense.setInvoiceNumber(invoiceNumber);
        expense.setApprovedBy(user);
        expense.setNotes(notes);
        expense.setExpenseDate(LocalDate.now());

        return ResponseEntity.ok(expenseRepository.save(expense));
    }

    // 3. Complaints
    @GetMapping("/complaints")
    public List<Complaint> getComplaints(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return complaintRepository.findByResidentId(resident.getId());
        }
        return complaintRepository.findAll();
    }

    @GetMapping("/complaint-categories")
    public List<ComplaintCategory> getComplaintCategories() {
        return complaintCategoryRepository.findAll();
    }

    @PostMapping("/complaints")
    public ResponseEntity<?> fileComplaint(@RequestBody Map<String, Object> body, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only residents can file complaints");
        }

        Long categoryId = Long.valueOf(body.get("categoryId").toString());
        String title = (String) body.get("title");
        String description = (String) body.get("description");
        String priority = (String) body.get("priority");

        ComplaintCategory category = complaintCategoryRepository.findById(categoryId).orElse(null);
        Complaint complaint = new Complaint();
        complaint.setCategory(category);
        complaint.setTitle(title);
        complaint.setDescription(description);
        complaint.setPriority(priority);
        complaint.setResident(resident);
        complaint.setFlat(resident.getFlat());

        return ResponseEntity.ok(complaintService.fileComplaint(complaint));
    }

    @PutMapping("/complaints/{id}/status")
    public ResponseEntity<?> updateComplaintStatus(@PathVariable Long id, @RequestBody Map<String, String> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "resident".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only staff/admins can update status");
        }

        String status = body.get("status");
        String resolutionNotes = body.get("resolutionNotes");
        return ResponseEntity.ok(complaintService.updateComplaintStatus(id, status, resolutionNotes, user));
    }

    @GetMapping("/complaints/{id}/comments")
    public List<ComplaintComment> getComments(@PathVariable Long id) {
        return complaintCommentRepository.findByComplaintId(id);
    }

    @PostMapping("/complaints/{id}/comments")
    public ResponseEntity<?> addComment(@PathVariable Long id, @RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Must be logged in");
        }
        Complaint complaint = complaintRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No such complaint"));
        ComplaintComment comment = new ComplaintComment();
        comment.setComplaint(complaint);
        comment.setUser(user);
        comment.setComment((String) body.get("comment"));
        comment.setIsInternal(Boolean.TRUE.equals(body.get("isInternal")));
        return ResponseEntity.ok(complaintCommentRepository.save(comment));
    }

    // 4. Visitors & Gate logs
    @GetMapping("/visitors")
    public List<Visitor> getVisitors() {
        return visitorRepository.findAll();
    }

    @PostMapping("/visitors")
    public ResponseEntity<?> addVisitor(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        Long flatId = Long.valueOf(body.get("flatId").toString());
        Flat flat = flatRepository.findById(flatId).orElse(null);

        Visitor visitor = new Visitor();
        visitor.setVisitorName((String) body.get("visitorName"));
        visitor.setPhoneNumber((String) body.get("phoneNumber"));
        visitor.setIdProofType((String) body.get("idProofType"));
        visitor.setIdProofNumber((String) body.get("idProofNumber"));
        visitor.setVehicleNumber((String) body.get("vehicleNumber"));
        visitor.setFlat(flat);
        visitor.setPurpose((String) body.get("purpose"));
        visitor.setPurposeDetails((String) body.get("purposeDetails"));
        visitor.setCheckedInBy(user);
        visitor.setApprovalStatus("approved"); // Auto approved for demo

        return ResponseEntity.ok(visitorRepository.save(visitor));
    }

    @PutMapping("/visitors/{id}/checkout")
    public ResponseEntity<?> checkOutVisitor(@PathVariable Long id, HttpSession session) {
        User user = getSessionUser(session);
        Visitor visitor = visitorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No such visitor"));
        visitor.setExitTime(LocalDateTime.now());
        visitor.setCheckedOutBy(user);
        return ResponseEntity.ok(visitorRepository.save(visitor));
    }

    @GetMapping("/pre-approved")
    public List<PreApprovedVisitor> getPreApproved(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return preApprovedVisitorRepository.findByResidentId(resident.getId());
        }
        return preApprovedVisitorRepository.findAll();
    }

    @PostMapping("/pre-approved")
    public ResponseEntity<?> addPreApproved(@RequestBody Map<String, Object> body, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only residents can pre-approve visitors");
        }

        PreApprovedVisitor pav = new PreApprovedVisitor();
        pav.setResident(resident);
        pav.setVisitorName((String) body.get("visitorName"));
        pav.setPhoneNumber((String) body.get("phoneNumber"));
        pav.setRelationship((String) body.get("relationship"));
        pav.setValidFrom(LocalDate.parse((String) body.get("validFrom")));
        pav.setValidUntil(LocalDate.parse((String) body.get("validUntil")));
        pav.setPurpose((String) body.get("purpose"));

        return ResponseEntity.ok(preApprovedVisitorRepository.save(pav));
    }

    @GetMapping("/deliveries")
    public List<DeliveryLog> getDeliveries() {
        return deliveryLogRepository.findAll();
    }

    @PostMapping("/deliveries")
    public ResponseEntity<?> addDelivery(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        Long flatId = Long.valueOf(body.get("flatId").toString());
        Flat flat = flatRepository.findById(flatId).orElse(null);

        DeliveryLog log = new DeliveryLog();
        log.setFlat(flat);
        log.setDeliveryType((String) body.get("deliveryType"));
        log.setDeliveryPersonName((String) body.get("deliveryPersonName"));
        log.setDeliveryPersonPhone((String) body.get("deliveryPersonPhone"));
        log.setCompanyName((String) body.get("companyName"));
        log.setTrackingNumber((String) body.get("trackingNumber"));
        log.setReceivedBySecurity(user);
        log.setReceivedTime(LocalDateTime.now());

        return ResponseEntity.ok(deliveryLogRepository.save(log));
    }

    @PutMapping("/deliveries/{id}/collect")
    public ResponseEntity<?> collectDelivery(@PathVariable Long id, @RequestBody Map<String, String> body) {
        DeliveryLog log = deliveryLogRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No such delivery"));
        log.setCollectedTime(LocalDateTime.now());
        log.setCollectedBy(body.get("collectedBy"));
        return ResponseEntity.ok(deliveryLogRepository.save(log));
    }

    // 5. Notices & Polls
    @GetMapping("/notices")
    public List<Notice> getNotices() {
        return noticeRepository.findByIsActiveTrueOrderByIsPinnedDescPublishedDateDesc();
    }

    @PostMapping("/notices")
    public ResponseEntity<?> createNotice(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "resident".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only staff/admins can post notices");
        }

        Notice notice = new Notice();
        notice.setTitle((String) body.get("title"));
        notice.setNoticeType((String) body.get("noticeType"));
        notice.setPriority((String) body.get("priority"));
        notice.setContent((String) body.get("content"));
        notice.setPublishedBy(user);
        if (body.get("validUntil") != null) {
            notice.setValidUntil(LocalDate.parse((String) body.get("validUntil")));
        }
        notice.setPublishedDate(LocalDateTime.now());
        notice.setIsPinned(Boolean.TRUE.equals(body.get("isPinned")));
        notice.setShowOnHomepage(Boolean.TRUE.equals(body.get("showOnHomepage")));

        return ResponseEntity.ok(noticeRepository.save(notice));
    }

    @PostMapping("/notices/{id}/view")
    public ResponseEntity<?> viewNotice(@PathVariable Long id) {
        Notice notice = noticeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No such notice"));
        notice.setViewCount(notice.getViewCount() + 1);
        return ResponseEntity.ok(noticeRepository.save(notice));
    }

    @GetMapping("/polls")
    public List<Poll> getPolls() {
        return pollRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }

    @PostMapping("/polls")
    public ResponseEntity<?> createPoll(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "resident".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only staff/admins can create polls");
        }

        Poll poll = new Poll();
        poll.setTitle((String) body.get("title"));
        poll.setDescription((String) body.get("description"));
        poll.setEndDate(LocalDateTime.parse((String) body.get("endDate")));
        poll.setCreatedBy(user);
        Poll savedPoll = pollRepository.save(poll);

        List<String> options = (List<String>) body.get("options");
        for (String optText : options) {
            PollOption option = new PollOption();
            option.setPoll(savedPoll);
            option.setOptionText(optText);
            pollOptionRepository.save(option);
        }

        return ResponseEntity.ok(savedPoll);
    }

    @GetMapping("/polls/{id}/options")
    public List<PollOption> getPollOptions(@PathVariable Long id) {
        return pollOptionRepository.findByPollId(id);
    }

    @PostMapping("/polls/{id}/vote")
    public ResponseEntity<?> votePoll(@PathVariable Long id, @RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Must be logged in to vote");
        }

        if (pollVoteRepository.existsByPollIdAndUserId(id, user.getId())) {
            return ResponseEntity.badRequest().body("You have already voted in this poll");
        }

        Long optionId = Long.valueOf(body.get("optionId").toString());
        PollOption option = pollOptionRepository.findById(optionId).orElseThrow(() -> new IllegalArgumentException("No such option"));
        
        PollVote vote = new PollVote();
        vote.setPoll(option.getPoll());
        vote.setOption(option);
        vote.setUser(user);
        pollVoteRepository.save(vote);

        option.setVoteCount(option.getVoteCount() + 1);
        pollOptionRepository.save(option);

        return ResponseEntity.ok(option);
    }

    // 6. Parking Slots
    @GetMapping("/parking-slots")
    public List<ParkingSlot> getParkingSlots() {
        return parkingSlotRepository.findAll();
    }

    @GetMapping("/vehicles")
    public List<Vehicle> getVehicles(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return vehicleRepository.findByResidentId(resident.getId());
        }
        return vehicleRepository.findAll();
    }

    @PostMapping("/vehicles")
    public ResponseEntity<?> addVehicle(@RequestBody Vehicle vehicle, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only residents can add vehicles");
        }
        vehicle.setResident(resident);
        return ResponseEntity.ok(vehicleRepository.save(vehicle));
    }

    @GetMapping("/parking-allocations")
    public List<ParkingAllocation> getParkingAllocations() {
        return parkingAllocationRepository.findAll();
    }

    @PostMapping("/parking-allocations")
    public ResponseEntity<?> allocateParking(@RequestBody Map<String, Object> body) {
        Long residentId = Long.valueOf(body.get("residentId").toString());
        Long vehicleId = Long.valueOf(body.get("vehicleId").toString());
        Long slotId = Long.valueOf(body.get("parkingSlotId").toString());

        Resident resident = residentRepository.findById(residentId).orElse(null);
        Vehicle vehicle = vehicleRepository.findById(vehicleId).orElse(null);
        ParkingSlot slot = parkingSlotRepository.findById(slotId).orElse(null);

        ParkingAllocation allocation = new ParkingAllocation();
        allocation.setResident(resident);
        allocation.setVehicle(vehicle);
        allocation.setParkingSlot(slot);
        allocation.setAllocatedDate(LocalDate.now());
        allocation.setMonthlyCharge(slot.getMonthlyCharge());

        ParkingAllocation saved = parkingAllocationRepository.save(allocation);

        slot.setStatus("occupied");
        parkingSlotRepository.save(slot);

        return ResponseEntity.ok(saved);
    }

    // 7. Events & Amenities
    @GetMapping("/events")
    public List<Event> getEvents() {
        return eventRepository.findAll();
    }

    @PostMapping("/events")
    public ResponseEntity<?> createEvent(@RequestBody Map<String, Object> body, HttpSession session) {
        User user = getSessionUser(session);
        if (user == null || "resident".equals(user.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only staff/admins can create events");
        }

        Event event = new Event();
        event.setTitle((String) body.get("title"));
        event.setEventType((String) body.get("eventType"));
        event.setDescription((String) body.get("description"));
        event.setStartDatetime(LocalDateTime.parse((String) body.get("startDatetime")));
        event.setEndDatetime(LocalDateTime.parse((String) body.get("endDatetime")));
        event.setVenue((String) body.get("venue"));
        event.setRequiresRegistration(Boolean.TRUE.equals(body.get("requiresRegistration")));
        if (body.get("maxParticipants") != null) {
            event.setMaxParticipants(Integer.valueOf(body.get("maxParticipants").toString()));
        }
        event.setStatus("published");
        event.setOrganizedBy(user);
        event.setContactPerson(user.getFullName());
        event.setContactPhone(user.getPhone() != null ? user.getPhone() : "1234567890");

        return ResponseEntity.ok(eventRepository.save(event));
    }

    @PostMapping("/events/{id}/register")
    public ResponseEntity<?> registerEvent(@PathVariable Long id, @RequestBody Map<String, Object> body, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only residents can register for events");
        }

        Event event = eventRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("No such event"));
        
        Optional<EventRegistration> existing = eventRegistrationRepository.findByEventIdAndResidentId(id, resident.getId());
        if (existing.isPresent()) {
            return ResponseEntity.badRequest().body("You are already registered for this event");
        }

        EventRegistration reg = new EventRegistration();
        reg.setEvent(event);
        reg.setResident(resident);
        reg.setNumberOfGuests(Integer.valueOf(body.get("numberOfGuests").toString()));
        reg.setGuestNames((String) body.get("guestNames"));
        reg.setStatus("confirmed");

        return ResponseEntity.ok(eventRegistrationRepository.save(reg));
    }

    @GetMapping("/amenities")
    public List<Amenity> getAmenities() {
        return amenityRepository.findByIsActiveTrue();
    }

    @GetMapping("/amenity-bookings")
    public List<AmenityBooking> getAmenityBookings(HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident != null) {
            return amenityBookingRepository.findByResidentId(resident.getId());
        }
        return amenityBookingRepository.findAll();
    }

    @PostMapping("/amenity-bookings")
    public ResponseEntity<?> bookAmenity(@RequestBody Map<String, Object> body, HttpSession session) {
        Resident resident = getSessionResident(session);
        if (resident == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Only residents can book amenities");
        }

        Long amenityId = Long.valueOf(body.get("amenityId").toString());
        Amenity amenity = amenityRepository.findById(amenityId).orElseThrow(() -> new IllegalArgumentException("No such amenity"));

        AmenityBooking booking = new AmenityBooking();
        booking.setAmenity(amenity);
        booking.setResident(resident);
        booking.setBookingDate(LocalDate.parse((String) body.get("bookingDate")));
        booking.setStartTime(LocalTime.parse((String) body.get("startTime")));
        booking.setEndTime(LocalTime.parse((String) body.get("endTime")));
        booking.setPurpose((String) body.get("purpose"));
        booking.setNumberOfGuests(Integer.valueOf(body.get("numberOfGuests").toString()));
        booking.setBookingCharge(amenity.getBookingCharge());
        booking.setStatus("confirmed");
        booking.setPaymentStatus(amenity.getBookingCharge().compareTo(BigDecimal.ZERO) > 0 ? "pending" : "paid");

        return ResponseEntity.ok(amenityBookingRepository.save(booking));
    }
}
